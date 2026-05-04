export { en, type Messages, type MessageKey } from './en';
export { bg } from './bg';

import { en, type Messages } from './en';
import { bg } from './bg';

export type Locale = 'en' | 'bg';

export const LOCALES: readonly Locale[] = ['en', 'bg'] as const;

export const MESSAGES: Record<Locale, Messages> = {
  en: en as Messages,
  bg,
};

export const MONTH_LABELS: Record<Locale, readonly string[]> = {
  en: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  bg: [
    'ян.',
    'фев.',
    'мар.',
    'апр.',
    'май',
    'юни',
    'юли',
    'авг.',
    'сеп.',
    'окт.',
    'ное.',
    'дек.',
  ],
};
