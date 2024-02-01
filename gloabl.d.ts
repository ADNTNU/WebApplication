import { locales } from '@/i18n';

// Use type safe message keys with `next-intl`

// Get the common keys among all locales


type Messages = typeof import('@/messages/en.json');
declare interface IntlMessages extends Messages {}