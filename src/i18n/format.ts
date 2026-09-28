import type { Locale, YearMonth } from '../data/types';

/** Substitui marcadores como {count} pelos valores informados. */
export function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}

export function formatYearMonth(value: YearMonth, locale: Locale) {
  const [year, month] = value.split('-').map(Number);
  const parts = new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric', timeZone: 'UTC' }).formatToParts(
    new Date(Date.UTC(year, month - 1, 1)),
  );
  const monthName = parts.find((part) => part.type === 'month')?.value.replace('.', '') ?? '';
  return `${monthName} ${year}`;
}
