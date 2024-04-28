import { round } from 'lodash-es'

export function formatNumber(value: number): string {
  return value.toLocaleString('en-US')
}

export function formatDecimal(value: number | string | undefined): string {
  if (value === undefined) return ''

  const rounded = round(Number(value), 2)
  return formatNumber(rounded)
}

export function formatDate(date: string) {
  return new Date(date).toLocaleString()
}
