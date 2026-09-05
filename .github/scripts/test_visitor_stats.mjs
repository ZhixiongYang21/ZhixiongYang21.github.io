// Run with: node .github/scripts/test_visitor_stats.mjs
// Uses mock Histats responses; never contacts or increments a live counter.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync(new URL('../../assets/js/site-refresh.js', import.meta.url), 'utf8');

function response(today, total, siteId = 5049707) {
  return { s_id: siteId, s_asc2: { 3: `Vis. today=${today}`, 4: `Visits=${total}` } };
}

function render(stats, present = true) {
  const total = { textContent: '\u2014' };
  const today = { textContent: '\u2014' };
  const attributes = new Map([['aria-busy', 'true'], ['title', 'Loading visitor statistics']]);
  let poll;
  let stopped = false;
  const container = {
    querySelector: selector => selector === '[data-visitors-total]' ? total : today,
    getAttribute: name => name === 'data-histats-site-id' ? '5049707' : attributes.get(name),
    setAttribute: (name, value) => attributes.set(name, value),
    removeAttribute: name => attributes.delete(name)
  };
  const window = {
    Histats: stats,
    setInterval: callback => { poll = callback; return 1; },
    clearInterval: () => { stopped = true; },
    fetch: () => { throw new Error('Reading statistics must not make network requests'); }
  };
  const document = {
    readyState: 'complete',
    querySelectorAll: () => [],
    querySelector: selector => selector === '[data-visitor-stats]' && present ? container : null
  };
  vm.runInNewContext(source, { document, window });
  return {
    total, today, attributes, window,
    tick: () => { if (poll && !stopped) poll(); },
    hasTimer: () => Boolean(poll),
    stopped: () => stopped
  };
}

let checks = 0;
function check(name, test) {
  test();
  checks += 1;
  console.log(`PASS ${name}`);
}

check('reads and formats the two visitor metrics, not page views', () => {
  const stats = response(12, 12345);
  stats.s_asc2[1] = 'Pages=999999';
  const page = render(stats);
  assert.equal(page.total.textContent, '12,345');
  assert.equal(page.today.textContent, '12');
  assert.equal(page.attributes.get('aria-busy'), 'false');
  assert.equal(page.attributes.has('title'), false);
  assert.equal(page.hasTimer(), false);
});

check('genuine zero counts remain zero', () => {
  const page = render(response(0, 0));
  assert.equal(page.total.textContent, '0');
  assert.equal(page.today.textContent, '0');
});

check('asynchronous response updates once and stops polling', () => {
  const page = render(undefined);
  page.tick();
  assert.equal(page.total.textContent, '\u2014');
  page.window.Histats = response(2, 10);
  page.tick();
  assert.equal(page.total.textContent, '10');
  assert.equal(page.today.textContent, '2');
  assert.equal(page.stopped(), true);
});

check('blocked tracker times out without fabricating zeroes', () => {
  const page = render(undefined);
  for (let i = 0; i < 120; i++) page.tick();
  assert.equal(page.stopped(), true);
  assert.equal(page.total.textContent, '\u2014');
  assert.equal(page.attributes.get('aria-busy'), 'false');
  assert.match(page.attributes.get('title'), /unavailable/);
});

check('rejects data from another website', () => {
  assert.equal(render(response(2, 10, 123)).total.textContent, '\u2014');
});

check('does not mislabel another metric when visitor fields are absent', () => {
  const page = render({ s_id: 5049707, s_asc2: { 1: 'Pages=100', 2: 'Pages today=20' } });
  assert.equal(page.total.textContent, '\u2014');
});

check('rejects invalid, fractional, shortened or unsafe numbers', () => {
  for (const value of ['', 'null', '-1', '1.5', '1.2k', '1,2', 'Infinity', '9007199254740992', '<script>1</script>']) {
    assert.equal(render(response(0, value)).total.textContent, '\u2014', value);
  }
});

check('accepts full counts with grouping separators', () => {
  for (const value of ['1234', '1,234', '1 234', '1\u00a0234']) {
    assert.equal(render(response(1, value)).total.textContent, '1,234');
  }
});

check('rejects impossible total/today combinations', () => {
  assert.equal(render(response(10, 2)).total.textContent, '\u2014');
});

check('disabled or local-preview counter does no work', () => {
  assert.equal(render(undefined, false).hasTimer(), false);
});

console.log(`${checks} visitor-counter checks passed.`);
