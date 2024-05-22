import { Airline } from '@models/Airline';
import { FlightSearchResult } from '@models/Flight';
import { Box, Skeleton, Stack, Typography } from '@mui/material';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import RouteInfo from './RouteInfo';
import AirportInfo from './AirportInfo';

type FlightInfoProps = {
  firstFlight?: FlightSearchResult | null;
  lastFlight?: FlightSearchResult | null;
  flightIntervals?: FlightSearchResult[] | null;
};

export default function FlightInfo(props: FlightInfoProps) {
  const { firstFlight, lastFlight: initLastFlight, flightIntervals } = props;

  const flights: FlightSearchResult[] = [
    ...(firstFlight ? [firstFlight] : []),
    ...(flightIntervals ?? []),
    ...(initLastFlight ? [initLastFlight] : []),
  ];

  let lastFlight: FlightSearchResult | null | undefined = initLastFlight;
  if (firstFlight && !lastFlight) {
    lastFlight = firstFlight;
  }

  let airline: Airline | 'several' | undefined;
  if (flights.length) {
    airline = flights.every((flight) => flight.airline) ? flights[0].airline : 'several';
  }

  const fromAirport = firstFlight?.departureAirport;
  const toAirport = lastFlight?.arrivalAirport;
  const departureDate = firstFlight?.departureDate
    ? new Date(firstFlight?.departureDate)
    : undefined;
  const arrivalDate = lastFlight?.arrivalDate ? new Date(lastFlight?.arrivalDate) : undefined;

  const iconSize = 32;
  const airlineNameFontSize = '0.7rem';

  return (
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
          gridRow: { xs: '1', md: '1 / 3' },
          gridColumn: { xs: '1 / 13', md: '1 / 3' },
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
          gridRow: { xs: '2', md: '1 / 3' },
          gridColumn: { xs: '1 / 7', sm: '1 / 5', md: '3 / 7' },
        }}
      >
        <AirportInfo airportCode={fromAirport?.code} date={departureDate} />
      </Box>
      <Box
        sx={{
          gridRow: { xs: '2', sm: '2', md: '1 / 3' },
          gridColumn: { xs: '3 / 13', sm: '5 / 8', md: '7 / 9' },
        }}
      >
        <RouteInfo flights={flights} fromDate={departureDate} toDate={arrivalDate} />
      </Box>
      <Box
        sx={{
          gridRow: { xs: '2', md: '1 / 3' },
          gridColumn: { xs: '7 / 13', sm: '8 / 13', md: '9 / 13' },
        }}
      >
        <AirportInfo airportCode={toAirport?.code} date={arrivalDate} side="right" />
      </Box>
    </Box>
  );
}
