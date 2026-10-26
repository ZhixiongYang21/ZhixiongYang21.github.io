"""Fetch public citation totals; fail without publishing if Scholar blocks the request."""

import json
import os
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlencode
from urllib.request import Request, urlopen


class CitationParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_cell = False
        self.cells = []
        self.text = []

    def handle_starttag(self, tag, attrs):
        if tag == "td" and "gsc_rsb_std" in dict(attrs).get("class", "").split():
            self.in_cell = True
            self.text = []

    def handle_data(self, data):
        if self.in_cell:
            self.text.append(data)

    def handle_endtag(self, tag):
        if tag == "td" and self.in_cell:
            self.cells.append("".join(self.text).strip())
            self.in_cell = False


def fetch_stats(scholar_id):
    url = "https://scholar.google.com/citations?" + urlencode({"user": scholar_id, "hl": "en"})
    request = Request(url, headers={"User-Agent": "Mozilla/5.0", "Accept-Language": "en-US,en;q=0.9"})
    with urlopen(request, timeout=30) as response:
        html = response.read().decode("utf-8")
    parser = CitationParser()
    parser.feed(html)
    # All-time / recent columns for citations, h-index and i10-index.
    if len(parser.cells) != 6:
        raise ValueError("Scholar statistics unavailable or markup changed; existing data is retained.")
    values = [cell.replace(",", "").replace(chr(160), "").replace(" ", "") for cell in parser.cells]
    if not all(value.isascii() and value.isdigit() for value in values):
        raise ValueError("Invalid Scholar statistics; existing data is retained.")
    total, recent, hindex, _, i10index, _ = map(int, values)
    if total < max(recent, hindex, i10index):
        raise ValueError("Inconsistent Scholar statistics; existing data is retained.")
    return {
        "scholar_id": scholar_id,
        "citedby": total,
        "updated": datetime.now(timezone.utc).isoformat(timespec="seconds"),
    }


if __name__ == "__main__":
    stats = fetch_stats(os.environ.get("GOOGLE_SCHOLAR_ID") or "HsuHMucAAAAJ")
    output = Path(__file__).parent / "results"
    output.mkdir(exist_ok=True)
    (output / "gs_data.json").write_text(json.dumps(stats, indent=2) + "\n", encoding="utf-8")
    print(f"Retrieved {stats['citedby']} citations.")
