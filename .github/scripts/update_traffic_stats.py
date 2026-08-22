"""Fetch public page-view totals from GA4 and write a small JSON payload."""

from __future__ import annotations

import argparse
from datetime import datetime, timezone
import json
import os
from pathlib import Path

from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import DateRange, Metric, RunReportRequest
from google.oauth2 import service_account


ANALYTICS_SCOPE = "https://www.googleapis.com/auth/analytics.readonly"


def required_environment_value(name: str) -> str:
    value = os.environ.get(name, "").strip()
    if not value:
        raise RuntimeError(f"Required environment variable {name} is not set")
    return value


def create_client(service_account_json: str) -> BetaAnalyticsDataClient:
    try:
        service_account_info = json.loads(service_account_json)
    except json.JSONDecodeError as error:
        raise RuntimeError("GA4_SERVICE_ACCOUNT_JSON is not valid JSON") from error

    credentials = service_account.Credentials.from_service_account_info(
        service_account_info,
        scopes=[ANALYTICS_SCOPE],
    )
    return BetaAnalyticsDataClient(credentials=credentials)


def page_views(
    client: BetaAnalyticsDataClient,
    property_id: str,
    start_date: str,
    end_date: str,
) -> int:
    response = client.run_report(
        RunReportRequest(
            property=f"properties/{property_id}",
            date_ranges=[DateRange(start_date=start_date, end_date=end_date)],
            metrics=[Metric(name="screenPageViews")],
        )
    )

    if not response.rows:
        return 0

    return int(response.rows[0].metric_values[0].value or 0)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", required=True, type=Path)
    arguments = parser.parse_args()

    property_id = required_environment_value("GA4_PROPERTY_ID")
    service_account_json = required_environment_value("GA4_SERVICE_ACCOUNT_JSON")
    start_date = os.environ.get("GA4_START_DATE", "2020-01-01").strip() or "2020-01-01"

    if not property_id.isdigit():
        raise RuntimeError("GA4_PROPERTY_ID must be the numeric property ID, not a G- measurement ID")

    client = create_client(service_account_json)
    total_views = page_views(client, property_id, start_date, "today")
    today_views = page_views(client, property_id, "today", "today")

    payload = {
        "total_views": total_views,
        "today_views": today_views,
        "updated_at": datetime.now(timezone.utc).isoformat(timespec="seconds").replace("+00:00", "Z"),
    }

    arguments.output.parent.mkdir(parents=True, exist_ok=True)
    arguments.output.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


if __name__ == "__main__":
    main()
