import type { InterestMeasureRange } from '@/features/rulesMining/types/interestMeasure.types';

export function formatInterestMeasureRange(range: InterestMeasureRange) {
  const openingBracket = range.from.closed ? '[' : '(';
  const closingBracket = range.to.closed ? ']' : ')';

  return `${openingBracket}${range.from.value}; ${range.to.value}${closingBracket}`;
}

export function formatFixedValue(value: string|number) {
  return value ?? '*';
}
