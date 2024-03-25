import { Airline } from '@models/Airline';
import { FlightSearchResult } from '@models/Flight';
import { Box, Skeleton, Typography } from '@mui/material';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import RouteInfo from './RouteInfo';
import AirportInfo from './AirportInfo';

type FlightInfoProps = {
  firstFlight?: FlightSearchResult;
  lastFlight?: FlightSearchResult;
  flightIntervals?: FlightSearchResult[];
};

export default function FlightInfo(props: FlightInfoProps) {
  const { firstFlight, lastFlight: initLastFlight, flightIntervals } = props;

  const flights: FlightSearchResult[] = [
    ...(firstFlight ? [firstFlight] : []),
    ...(flightIntervals ?? []),
    ...(initLastFlight ? [initLastFlight] : []),
  ];

  let lastFlight: FlightSearchResult | undefined = initLastFlight;
  if (firstFlight && !lastFlight) {
    lastFlight = firstFlight;
  }

  let airline: Airline | 'several' | undefined;
  if (flights.length) {
    airline = flights.every((flight) => flight.airline) ? flights[0].airline : 'several';
  }

  const fromAirport = firstFlight?.fromAirport;
  const toAirport = lastFlight?.toAirport;
  const departureDate = firstFlight?.departureDate;
  const arrivalDate = lastFlight?.arrivalDate;

  const iconSize = 40;
  const airlineNameFontSize = '0.75rem';

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateRows: 'repeat(2, 1fr)',
        gridTemplateColumns: 'repeat(12, 1fr)',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          gridRow: { xs: '2', sm: '1 / 3' },
          gridColumn: { xs: '1 / 2', md: '1 / 2' },
        }}
      >
        {airline ? (
          <Box>
            <ConnectingAirportsIcon sx={{ width: iconSize, height: iconSize }} />
            <Typography fontSize={airlineNameFontSize}>
              {typeof airline !== 'string' ? airline.name : 'several'}
            </Typography>
          </Box>
        ) : (
          <>
            <Skeleton variant="rectangular" width={40} height={40} />
            <Skeleton variant="text" sx={{ fontSize: airlineNameFontSize }} width="100%" />
          </>
        )}
      </Box>
      <Box
        sx={{
          gridRow: { xs: '1', md: '1 / 3' },
          gridColumn: { xs: '1 / 7', sm: '3 / 8', md: '2 / 6' },
        }}
      >
        <AirportInfo airportCode={fromAirport?.code} date={departureDate} />
      </Box>
      <Box
        sx={{
          gridRow: { xs: '2', md: '1 / 3' },
          gridColumn: { xs: '3 / 13', md: '6 / 9' },
        }}
      >
        <RouteInfo
          flights={flights}
          fromDate={firstFlight?.departureDate}
          toDate={lastFlight?.arrivalDate}
        />
      </Box>
      <Box
        sx={{
          gridRow: { sx: '1', md: '1 / 3' },
          gridColumn: { sx: '7 / 13', sm: '8 / 13', md: '9 / 13' },
        }}
      >
        <AirportInfo airportCode={toAirport?.code} date={arrivalDate} side="right" />
      </Box>
    </Box>
  );
}
