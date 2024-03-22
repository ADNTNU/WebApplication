import { FlightSearchResult } from '@/models/Flight';
import { TripSearchResult } from '@/models/Trip';
import { Button, Divider, Skeleton, Stack, Typography } from '@mui/material';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import { Airline } from '@/models/Airline';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

type AirportInfoProps = {
  date?: Date;
  airportCode?: string;
  side?: 'left' | 'right';
};

function AirportInfo(props: AirportInfoProps) {
  const { date: dateTime, airportCode, side = 'left' } = props;

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

  // TODO: Internationalize time format
  // Norwegian format
  const time = dateTime.toLocaleTimeString('nb-NO', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const date = dateTime.toLocaleDateString('nb-NO', {
    day: '2-digit',
    month: 'short',
  });

  return (
    <Stack marginY="auto" textAlign={side === 'left' ? 'left' : 'right'}>
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

type RouteInfoProps = {
  flights?: FlightSearchResult[];
  fromDate?: Date;
  toDate?: Date;
};

function RouteInfo(props: RouteInfoProps) {
  const { flights, fromDate, toDate } = props;

  dayjs.extend(relativeTime);

  const duration = fromDate && toDate ? dayjs(toDate).from(fromDate, true) : undefined;

  const durationFontSize = '1rem';

  if (!flights?.length || !duration) {
    return (
      <Stack minWidth="60px" alignItems="center">
        <Skeleton width="60%" variant="text" sx={{ fontSize: durationFontSize }} />
        <Skeleton width="100%" height="3px" />
        <Skeleton width="60%" variant="text" sx={{ fontSize: durationFontSize }} />
      </Stack>
    );
  }

  // TODO: Add collapsible to show all stops

  // TODO: Internationalize duration and stops format
  return (
    <Stack alignItems="center">
      <Typography fontSize={durationFontSize}>{duration}</Typography>
      <Divider orientation="vertical" />
      <Typography fontSize={durationFontSize}>
        {flights.length - 1 ? `${flights.length - 1} stopp` : 'Direkte'}
      </Typography>
    </Stack>
  );
}

type FlightInfoProps = {
  firstFlight?: FlightSearchResult;
  lastFlight?: FlightSearchResult;
  flightIntervals?: FlightSearchResult[];
};

function FlightInfo(props: FlightInfoProps) {
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
    <Stack direction="row" flexGrow={1} gap={1} alignItems="center">
      <Stack alignItems="center" width="100px">
        {/* <SvgIcon */}
        {airline ? (
          <>
            <ConnectingAirportsIcon sx={{ width: iconSize, height: iconSize }} />
            {/* TODO: Internationalize "several" string */}
            <Typography fontSize={airlineNameFontSize}>
              {typeof airline !== 'string' ? airline.name : 'several'}
            </Typography>
          </>
        ) : (
          <>
            <Skeleton variant="rectangular" width={40} height={40} />
            <Skeleton variant="text" sx={{ fontSize: airlineNameFontSize }} width="100%" />
          </>
        )}
      </Stack>
      <Stack direction="row" justifyContent="space-between" flexGrow={1} alignItems="center">
        <AirportInfo airportCode={fromAirport?.code} date={departureDate} />
        <RouteInfo
          flights={flights}
          fromDate={firstFlight?.departureDate}
          toDate={lastFlight?.arrivalDate}
        />
        <AirportInfo airportCode={toAirport?.code} date={arrivalDate} side="right" />
      </Stack>
    </Stack>
  );
}

type PriceInfoProps = {
  price?: number;
  currency?: string;
};

function PriceInfo(props: PriceInfoProps) {
  const { price, currency } = props;

  const priceFontSize = '1.5rem';

  if (!price || !currency) {
    return (
      <Stack width="100px" gap={2} alignItems="center" marginY="auto">
        <Skeleton width="60%" variant="text" sx={{ fontSize: priceFontSize }} />
        <Skeleton width="100%" height="24px" variant="rectangular" />
      </Stack>
    );
  }

  return (
    <Stack flexGrow={1} gap={2} marginY="auto">
      <Typography fontWeight="bold" fontSize={priceFontSize} textAlign="right">
        {price} {currency}
      </Typography>
      <Button variant="contained" color="primary">
        Book
      </Button>
    </Stack>
  );
}

type SearchResultProps = {
  trip?: TripSearchResult;
};

export function SearchResult(props: SearchResultProps) {
  const { trip } = props;

  const leaveFlightInfoProps = {
    firstFlight: trip?.leaveFlightInitial,
    lastFlight: trip?.leaveFlightFinal,
    flightIntervals: trip?.leaveFlightIntervals,
  };
  const returnFlightInfoProps = {
    firstFlight: trip?.returnFlightInitial,
    lastFlight: trip?.returnFlightFinal,
    flightIntervals: trip?.returnFlightIntervals,
  };

  return (
    <>
      <Stack
        direction="row"
        width="100%"
        padding={1}
        gap={1}
        sx={{
          borderRadius: 2,
          backgroundColor: 'background.paper',
        }}
      >
        <Stack flexGrow={1} gap={1}>
          <FlightInfo {...leaveFlightInfoProps} />
          {returnFlightInfoProps && trip?.returnFlightInitial ? (
            <>
              <Divider
                sx={{
                  backgroundColor: 'text.disabled',
                }}
              />
              <FlightInfo {...returnFlightInfoProps} />
            </>
          ) : null}
        </Stack>
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            width: '1px',
            backgroundColor: 'text.disabled',
          }}
        />
        <PriceInfo price={trip?.minPrice?.value} currency={trip?.minPrice?.currency} />
      </Stack>
    </>
  );
}

type SearchResultsProps = {
  trips?: TripSearchResult[];
};

export default function SearchResults(props: SearchResultsProps) {
  let { trips } = props;

  const tempData: TripSearchResult = {
    id: 2134,
    minPrice: {
      value: 1234,
      currency: 'NOK',
    },
    leaveFlightInitial: {
      airline: {
        id: 3123124,
        name: 'Temp Airline',
        logo: 'https://www.svgrepo.com/show/522436/plane.svg',
      },
      id: 4312,
      fromAirport: {
        code: 'OSL',
        id: 231894,
        location: {
          id: 89321,
          name: 'Oslo',
          country: 'Norway',
        },
        name: 'Oslo Airport',
      },
      toAirport: {
        code: 'AES',
        id: 231894,
        location: {
          id: 89321,
          name: 'Alesund',
          country: 'Norway',
        },
        name: 'Alesund Airport Vigra',
      },
      departureDate: new Date(Date.now() - 43 * 60 * 1000),
      arrivalDate: new Date(),
      name: 'Temp Flight',
    },
    returnFlightInitial: {
      airline: {
        id: 3123124,
        name: 'Temp Airline 2',
        logo: 'https://www.svgrepo.com/show/522436/plane.svg',
      },
      id: 4312,
      fromAirport: {
        code: 'AES',
        id: 231894,
        location: {
          id: 89321,
          name: 'Alesund',
          country: 'Norway',
        },
        name: 'Alesund Airport Vigra',
      },
      toAirport: {
        code: 'OSL',
        id: 231894,
        location: {
          id: 89321,
          name: 'Oslo',
          country: 'Norway',
        },
        name: 'Oslo Airport',
      },
      departureDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      arrivalDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 31 * 60 * 1000),
      name: 'Temp Flight',
    },
  };

  if (tempData && !trips) {
    trips = Array.from({ length: 10 }).map(() => tempData);
  }
  return (
    <>
      <Stack width="100%" gap={2}>
        {trips
          ? trips.map((trip) => <SearchResult key={trip.id} trip={trip} />)
          : Array.from({ length: 10 }).map(() => <SearchResult key="searchResultSkeleton" />)}
      </Stack>
    </>
  );
}
