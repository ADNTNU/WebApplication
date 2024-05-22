import { Airline } from '@models/Airline';
import { FlightSearchResult } from '@models/Flight';
import { Box, Skeleton, Stack, Typography } from '@mui/material';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import _ from 'lodash';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import RouteInfo from './RouteInfo';
import AirportInfo from './AirportInfo';

dayjs.extend(relativeTime);

type FlightInfoProps = {
  firstFlight?: FlightSearchResult | null;
  lastFlight?: FlightSearchResult | null;
  flightIntervals?: FlightSearchResult[] | null;
  collapseStops?: boolean;
};

export default function FlightInfo(props: FlightInfoProps) {
  const { firstFlight, lastFlight: initLastFlight, flightIntervals, collapseStops = true } = props;

  const flights: FlightSearchResult[] = [
    ...(firstFlight ? [firstFlight] : []),
    ...(flightIntervals ?? []),
    ...(initLastFlight ? [initLastFlight] : []),
  ];

  let lastFlight: FlightSearchResult | null | undefined = initLastFlight;
  let multipleStops = flights.length > 1;
  if (firstFlight && !lastFlight) {
    multipleStops = false;
    lastFlight = firstFlight;
  }

  let airline: Airline | 'several' | undefined;
  if (flights.length) {
    const firstAirline = flights[0].airline;
    airline = flights.every((flight) => _.isEqual(flight.airline, firstAirline))
      ? flights[0].airline
      : 'several';
  }

  const fromAirport = firstFlight?.departureAirport;
  const toAirport = lastFlight?.arrivalAirport;
  const departureDate = firstFlight?.departureDate
    ? new Date(firstFlight?.departureDate)
    : undefined;
  const arrivalDate = lastFlight?.arrivalDate ? new Date(lastFlight?.arrivalDate) : undefined;

  const iconSize = 32;
  const airlineNameFontSize = '0.7rem';
  const routeInfoFontSize = '0.75rem';
  const duration =
    departureDate && arrivalDate ? dayjs(departureDate).from(arrivalDate, true) : undefined;

  return (
    <Stack gap={1} padding={1}>
      <Box
        sx={{
          flexGrow: 1,
          display: 'grid',
          gridTemplateRows: 'repeat(2, 1fr)',
          gridTemplateColumns: 'repeat(12, 1fr)',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            // gridRow: { xs: '1', md: '1 / 3' },
            // gridColumn: { xs: '1 / 13', md: '1 / 3' },
            gridRow: { xs: '2', sm: '1 / 3' },
            gridColumn: { xs: '1 / 4', sm: '1 / 2' },
          }}
        >
          {airline ? (
            <Stack
              sx={{
                flexDirection: { xs: 'row', md: 'column' },
                alignItems: { xs: 'center', md: 'flex-start' },
              }}
            >
              <ConnectingAirportsIcon sx={{ width: iconSize, height: iconSize }} />
              <Typography fontSize={airlineNameFontSize}>
                {typeof airline !== 'string' ? airline.name : 'several'}
              </Typography>
            </Stack>
          ) : (
            <>
              <Skeleton variant="rectangular" width={40} height={40} />
              <Skeleton variant="text" sx={{ fontSize: airlineNameFontSize }} width="100%" />
            </>
          )}
        </Box>
        <Box
          sx={{
            // gridRow: { xs: '2', md: '1 / 3' },
            // gridColumn: { xs: '1 / 7', sm: '1 / 5', md: '3 / 7' },
            gridRow: { xs: '1', sm: '1 / 3' },
            gridColumn: { xs: '1 / 6', sm: '3 / 6', md: '2 / 6' },
          }}
        >
          <AirportInfo airportCode={fromAirport?.code} date={departureDate} />
        </Box>
        <Box
          sx={{
            gridRow: { xs: '2', sm: '1 / 3' },
            gridColumn: { xs: '7 / 13', sm: '6 / 8' },
          }}
        >
          <Stack sx={{ alignItems: { xs: 'end', sm: 'center' } }}>
            <Typography fontSize={routeInfoFontSize}>{duration}</Typography>
          </Stack>
        </Box>
        <Box
          sx={{
            // gridRow: { xs: '2', md: '1 / 3' },
            // gridColumn: { xs: '7 / 13', sm: '8 / 13', md: '9 / 13' },
            gridRow: { xs: '1', sm: '1 / 3' },
            gridColumn: { xs: '8 / 13' },
          }}
        >
          <AirportInfo airportCode={toAirport?.code} date={arrivalDate} side="right" />
        </Box>
      </Box>
      {collapseStops && multipleStops ? (
        <RouteInfo
          firstFlight={firstFlight}
          lastFlight={lastFlight}
          flightIntervals={flightIntervals}
          fontSize={routeInfoFontSize}
        />
      ) : null}
    </Stack>
  );
}
