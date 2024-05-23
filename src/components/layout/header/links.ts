export const mainLinks = [
  // {
  //   href: '/search',
  //   i18nNS: 'search',
  // },
] as const;

export type MainLinkHref = (typeof mainLinks)[number]['href'];
