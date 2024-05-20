import { useTranslations } from 'next-intl';

export function useTranslatedStopMessage(stopCount: number) {
  const t = useTranslations('common.trip');

  if (stopCount === 0) {
    return t('direct');
  }
  if (stopCount === 1) {
    return t('oneStop');
  }
  return t('pluralStops', { stops: stopCount });
}

type CommonTripTranslations = ReturnType<typeof useTranslations<'common.trip'>>;

export function useTranslatedStopRangeMessage(
  t: CommonTripTranslations,
  from: number | null,
  to: number | null,
) {
  // const t = useTranslations('common.trip');

  if (from === null || to === null) {
    return '';
  }

  if (from === 0 && to === 1) {
    return t('zeroToOneStop');
  }
  if (from === 0 && to > 1) {
    return t('zeroToPluralStops', { to });
  }
  if (from === 1 && to > 1) {
    return t('oneToPluralStops', { to });
  }
  return t('pluralToPluralStops', { from, to });
}
