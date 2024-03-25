import { Locale } from '@internationalization/i18n';
import getDateTimeFromLocale from '@internationalization/utils/getDateTimeFromLocale';
import { Divider, Skeleton, Stack, Typography } from '@mui/material';
import { useLocale } from 'next-intl';

type AirportInfoProps = {
  date?: Date;
  airportCode?: string;
  side?: 'left' | 'right';
};

export default function AirportInfo(props: AirportInfoProps) {
  const { date: dateTime, airportCode, side = 'left' } = props;

  const locale = useLocale() as Locale;

  const timeFontSize = '1.25rem';
  const airportCodeFontSize = '1rem';
  const dividerHeight = '0.9rem'; // Use approx. 80% of the font size

  if (!dateTime || !airportCode) {
    return (
      <Stack width="50px" alignItems={side === 'left' ? 'flex-start' : 'flex-end'} marginY="auto">
        <Skeleton width="60%" variant="text" sx={{ fontSize: timeFontSize }} />
        <Skeleton width="100%" variant="text" sx={{ fontSize: airportCodeFontSize }} />
      </Stack>
    );
  }

  const dateTimeLocale = getDateTimeFromLocale(locale);

  const time = dateTime.toLocaleTimeString(dateTimeLocale, {
    hour: '2-digit',
    minute: '2-digit',
  });
  const date = dateTime.toLocaleDateString(dateTimeLocale, {
    day: '2-digit',
    month: 'short',
  });

  return (
    <Stack
      marginY="auto"
      textAlign={side === 'left' ? 'left' : 'right'}
      alignItems={side === 'left' ? undefined : 'flex-end'}
      flexGrow={1}
    >
      <Typography fontWeight="bold" fontSize={timeFontSize}>
        {time}
      </Typography>
      <Stack direction="row" gap={0.5} alignItems="center">
        <Typography fontSize={airportCodeFontSize}>{airportCode}</Typography>
        <Divider
          orientation="vertical"
          sx={{ width: '1px', height: dividerHeight, backgroundColor: 'gray' }}
        />
        <Typography fontSize={airportCodeFontSize}>{date}</Typography>
      </Stack>
    </Stack>
  );
}
