// Use type safe message keys with `next-intl`

type Messages = typeof import('@/internationalization/messages/en.json') &
  typeof import('@/internationalization/messages/nb.json');
type IntlMessages = Messages;
