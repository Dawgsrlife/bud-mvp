/**
 * Baseline test for the Verdict factory.
 *
 * Demonstrates the testing convention: behavior-described, not implementation-described.
 * Real tests come once Jest + ts-jest are installed.
 */

import { Verdict } from '../../src/features/scanner/domain/entities/verdict';

describe('Verdict', () => {
  it('compatible() returns a compatible verdict with confidence 1', () => {
    const v = Verdict.compatible();
    expect(v.kind).toBe('compatible');
    expect(v.confidence).toBe(1);
    expect(v.triggeredAllergens).toHaveLength(0);
  });

  it('avoid() carries the triggered allergens list', () => {
    const v = Verdict.avoid(['peanut'], 'contains peanut');
    expect(v.kind).toBe('avoid');
    expect(v.triggeredAllergens).toEqual(['peanut']);
  });

  it('caution() defaults to confidence 0.8 when not specified', () => {
    const v = Verdict.caution(['tree nuts'], 'may contain tree nuts');
    expect(v.kind).toBe('caution');
    expect(v.confidence).toBe(0.8);
  });

  it('unknown() returns confidence 0', () => {
    const v = Verdict.unknown();
    expect(v.kind).toBe('unknown');
    expect(v.confidence).toBe(0);
  });
});
