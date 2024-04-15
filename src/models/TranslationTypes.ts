export type EnglishMessage = typeof import('@internationalization/messages/en.json');
export type NorwegianMessage = typeof import('@internationalization/messages/nb.json');

export type CommonKeys<T, U> = T extends object
  ? U extends object
    ? {
        [K in Extract<keyof T, keyof U>]: CommonKeys<T[K], U[K]>;
      }
    : never
  : never;

export type CommonMessageKeys = CommonKeys<EnglishMessage, NorwegianMessage>;

export type TranslatedPage = keyof CommonMessageKeys['Page'];
export type TranslatedPageProp = keyof CommonMessageKeys['Page'][TranslatedPage];
