import { TripSearchResult } from '@models/Trip';
import { Divider, Paper, Stack } from '@mui/material';
import PriceInfo from './PriceInfo';
import FlightInfo from './FlightInfo';

type SearchResultProps = {
  trip?: TripSearchResult;
};

export default function SearchResult(props: SearchResultProps) {
  const { trip } = props;

  const leaveFlightInfoProps = {
    firstFlight: trip?.leaveInitialFlight,
    lastFlight: trip?.leaveInitialFlight,
    stopCount: trip?.leaveStopCount,
  };
  const returnFlightInfoProps = {
    firstFlight: trip?.returnInitialFlight,
    lastFlight: trip?.returnArrivalFlight,
    stopCount: trip?.returnStopCount,
  };

  return (
    <Stack
      component={Paper}
      width="100%"
      padding={1}
      gap={1}
      sx={{
        flexDirection: { xs: 'column', md: 'row' },
        borderRadius: 2,
      }}
    >
      <Stack flexGrow={1} gap={1}>
        <FlightInfo {...leaveFlightInfoProps} />
        {returnFlightInfoProps && trip?.returnInitialFlight ? (
          <>
            <Divider
            // sx={{
            //   backgroundColor: 'text.disabled',
            // }}
            />
            <FlightInfo {...returnFlightInfoProps} />
          </>
        ) : null}
      </Stack>
      <Divider
        orientation="vertical"
        flexItem
        // sx={{
        //   // width: '1px',
        //   backgroundColor: 'text.disabled',
        // }}
      />
      <PriceInfo price={trip?.minPrice?.price} currency={trip?.minPrice?.currency} />
    </Stack>
  );
}
