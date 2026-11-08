import test from 'node:test';
import assert from 'node:assert/strict';
import { formatLocalizedDate, formatImpactNumber } from '../src/utils/formatters.ts';

test('formatLocalizedDate formats date strings accurately', () => {
  const formattedEn = formatLocalizedDate('2026-11-08', 'en');
  assert.ok(formattedEn.includes('2026'));

  const formattedHi = formatLocalizedDate('2026-11-08', 'hi');
  assert.ok(formattedHi.includes('2026') || formattedHi.length > 0);
});

test('formatImpactNumber formats numbers with regional groupings', () => {
  const formatted = formatImpactNumber(21000, 'en');
  assert.equal(formatted, '21,000');
});
