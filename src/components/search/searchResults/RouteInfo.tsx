import { useTranslatedStopMessage } from '@utils/useTranslatedStopMessage';
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

  const at = useTranslations('actions');

  const numberOfStops = flights ? flights.length - 1 : 0;
  let stopsString;
  stopsString = useTranslatedStopMessage(numberOfStops);

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
