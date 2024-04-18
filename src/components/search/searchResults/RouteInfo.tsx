import { FlightSearchResult } from '@models/Flight';
import { Divider, Skeleton, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useTranslations } from 'next-intl';

type RouteInfoProps = {
  flights?: FlightSearchResult[];
  fromDate?: Date;
  toDate?: Date;
};

export default function RouteInfo(props: RouteInfoProps) {
  const { flights, fromDate, toDate } = props;

  const t = useTranslations('Flights');
  const at = useTranslations('Actions');

  dayjs.extend(relativeTime);

  const duration = fromDate && toDate ? dayjs(toDate).from(fromDate, true) : undefined;

  const fontSize = '0.75rem';

  if (!flights?.length || !duration) {
    return (
      <Stack minWidth="60px" alignItems="center">
        <Skeleton width="60%" variant="text" sx={{ fontSize }} />
        <Skeleton width="100%" height="3px" />
        <Skeleton width="60%" variant="text" sx={{ fontSize }} />
      </Stack>
    );
  }

  // TODO: Add collapsible to show all stops

  const numberOfStops = flights.length - 1;
  let stopsString;

  if (numberOfStops === 0) {
    stopsString = t('direct');
  } else if (numberOfStops === 1) {
    stopsString = t('oneStop');
  } else {
    stopsString = t('pluralStops', { stops: numberOfStops });
  }

  if (numberOfStops > 0) {
    stopsString = at('expandMessage', { message: stopsString });
  }

  return (
    <Stack alignItems="center">
      <Typography fontSize={fontSize}>{duration}</Typography>
      <Divider orientation="vertical" />
      <Typography fontSize={fontSize}>{stopsString}</Typography>
    </Stack>
  );
}