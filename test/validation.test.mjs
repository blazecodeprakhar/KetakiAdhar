import test from 'node:test';
import assert from 'node:assert/strict';
import { isValidEmail, isValidIndianPhone, sanitizeIndianPhone, isValidName, formatCurrencyINR } from '../src/utils/validation.ts';

test('Email validation tests', () => {
  assert.equal(isValidEmail('info@ketakiadhar.in'), true);
  assert.equal(isValidEmail('patron@example.com'), true);
  assert.equal(isValidEmail('invalid-email'), false);
  assert.equal(isValidEmail(''), false);
});

test('Indian phone sanitization and validation tests', () => {
  assert.equal(sanitizeIndianPhone('+91 98765-43210'), '9876543210');
  assert.equal(isValidIndianPhone('9876543210'), true);
  assert.equal(isValidIndianPhone('8123456789'), true);
  assert.equal(isValidIndianPhone('1234567890'), false);
  assert.equal(isValidIndianPhone('98765'), false);
});

test('Name validation tests', () => {
  assert.equal(isValidName('Rajesh Kumar'), true);
  assert.equal(isValidName('A'), false);
  assert.equal(isValidName('   '), false);
});

test('Currency formatting tests', () => {
  const formatted = formatCurrencyINR(500);
  assert.ok(formatted.includes('500'));
});
