import { round } from 'lodash-es'
import { format as dateFnsFormat } from 'date-fns'

export function formatNumber(value: number): string {
  return value.toLocaleString('en-US')
}

export function formatDecimal(value: number | string | undefined): string {
  if (value === undefined) return ''

  const rounded = round(Number(value), 2)
  return formatNumber(rounded)
}

const csDateFormat = 'dd. MM. yyyy HH:mm:ss'
const enDateFormat = 'MM/dd/yyyy HH:mm:ss'
const csLanguages = ['cs-CZ', 'cs', 'sk-SK', 'sk']

export function formatDate(date: string) {
  const dateFormat = csLanguages.includes(navigator.language) ? csDateFormat : enDateFormat
  return dateFnsFormat(new Date(date), dateFormat)
}
