// Use type safe message keys with `next-intl`

// Get the common keys among all locales

type Messages = typeof import('@/messages/en.json');
type IntlMessages = Messages;
