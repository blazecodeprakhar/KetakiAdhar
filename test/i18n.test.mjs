import test from 'node:test';
import assert from 'node:assert/strict';
import { translations, languages } from '../src/translations/translations.ts';

test('i18n defines all 4 supported languages', () => {
  const codes = languages.map(l => l.code);
  assert.deepEqual(codes, ['en', 'mr', 'kn', 'hi']);
});

test('i18n top-level keys are identical across all languages', () => {
  const enKeys = Object.keys(translations.en).sort();
  for (const lang of ['mr', 'kn', 'hi']) {
    const langKeys = Object.keys(translations[lang]).sort();
    assert.deepEqual(langKeys, enKeys, `Mismatch in top-level keys for ${lang}`);
  }
});

test('essential navigation keys exist in all languages', () => {
  for (const lang of ['en', 'mr', 'kn', 'hi']) {
    assert.ok(translations[lang].nav.story);
    assert.ok(translations[lang].nav.volunteer);
    assert.ok(translations[lang].nav.donateNow);
    assert.ok(translations[lang].nav.contact);
  }
});
