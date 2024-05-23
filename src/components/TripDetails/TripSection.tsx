import { Trip } from '@models/Trip';
import { Box, Divider, Paper, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import airplaneInteriorImage from '@images/airplane-interior.jpg';
import FlightInfo from '@components/search/searchResults/FlightInfo';
import capitalizeFirstLetter from '@utils/capitalizeFirstLetter';
import { Flight } from '@models/Flight';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useTranslations } from 'next-intl';
import postSaved from '@serverActions/saved';
import TripPrices from './TripPrices';
import TripOverview from './TripOverview';
import SaveButton from './SaveButton';

dayjs.extend(relativeTime);

type TripSectionProps = {
  trip: Trip;
};

export default function TripSection(props: TripSectionProps) {
  const { trip } = props;

  const t = useTranslations('common.trip');
  const cT = useTranslations('common');
  const comT = useTranslations('components.trip');

  const firstFlight = trip.leaveInitialFlight;
  const flightIntervals = trip.leaveFlightIntervals;
  const lastFlight = trip.leaveArrivalFlight;
  const returnFirstFlight = trip.returnInitialFlight;
  const { returnFlightIntervals } = trip;
  const returnLastFlight = trip.returnArrivalFlight;

  const leaveFlights = [firstFlight, ...(flightIntervals || []), lastFlight];

  const flights = [
    ...leaveFlights,
    returnFirstFlight,
    ...(returnFlightIntervals || []),
    returnLastFlight,
  ];
  const filteredFlights = flights.filter((flight) => flight) as Flight[];
  const sortedFlights = filteredFlights.sort((a, b) => {
    return new Date(a.departureDate).getTime() - new Date(b.departureDate).getTime();
  });

  const initialDurations: {
    inAir: number;
    layover: number;
    total: number;
    lastProcessedFlight: Flight | null;
  } = {
    inAir: 0,
    layover: 0,
    total: 0,
    lastProcessedFlight: null,
  };

  const durations = sortedFlights.reduce((acc, flight) => {
    acc.inAir += new Date(flight.arrivalDate).getTime() - new Date(flight.departureDate).getTime();
    acc.layover += acc.lastProcessedFlight
      ? new Date(flight.departureDate).getTime() -
        new Date(acc.lastProcessedFlight?.arrivalDate).getTime()
      : 0;
    acc.total = acc.inAir + acc.layover;
    acc.lastProcessedFlight = flight;
    return acc;
  }, initialDurations);

  const roundTrip = !!returnFirstFlight;

  return (
    <Stack width="100%" gap={2}>
      {/* Use unsplash image search for "Airplane interior" */}
      <Box
        position="relative"
        sx={{
          height: { xs: 300, md: 350 },
          borderRadius: 1,
        }}
        overflow="hidden"
      >
        <Image
          src={airplaneInteriorImage}
          alt="Airplane image"
          fill
          style={{ objectFit: 'cover' }}
          sizes="max-width: 1152px) 97vw, 1152px"
          priority
        />
      </Box>

      <SaveButton
        tripId={trip.id}
        serverAction={postSaved}
        localizedDeleteText={comT('delete')}
        localizedSaveText={comT('save')}
      />

      <Stack sx={{ flexDirection: { xs: 'column', md: 'row' } }} gap={2}>
        <TripOverview
          departureAirport={firstFlight.departureAirport}
          arrivalAirport={lastFlight?.arrivalAirport || firstFlight.arrivalAirport}
          roundTrip={roundTrip}
          localizedInAirDuration={dayjs(durations.inAir).from(0, true)}
          localizedLayoverDuration={
            durations.layover ? dayjs(durations.layover).from(0, true) : cT('none')
          }
          localizedTotalDuration={dayjs(durations.total).from(0, true)}
        />
        <TripPrices prices={trip.prices} />
      </Stack>

      <Stack padding={2} gap={1} component={Paper}>
        <Box>
          <Typography>{capitalizeFirstLetter(t('departure'))}</Typography>
          <FlightInfo
            firstFlight={firstFlight}
            flightIntervals={flightIntervals}
            lastFlight={lastFlight}
          />
        </Box>
        {returnFirstFlight ? (
          <>
            <Divider flexItem />
            <Box>
              <Typography>{capitalizeFirstLetter(t('return'))}</Typography>
              <FlightInfo
                firstFlight={returnFirstFlight}
                flightIntervals={returnFlightIntervals}
                lastFlight={returnLastFlight}
              />
            </Box>
          </>
        ) : null}
      </Stack>
    </Stack>
  );
}
