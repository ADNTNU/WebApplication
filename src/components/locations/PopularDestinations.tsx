import { Grid, Stack, Typography } from '@mui/material';
import { ComponentProps } from 'react';
// import usePopularDestinationsSWR from './usePopularDestinationsSWR';
import { PopularDestination } from '@models/DTO/Location';
import { useTranslations } from 'next-intl';
import LocationCard from './LocationCard';

type GridSx = ComponentProps<typeof Grid>['sx'];
const gridItemSx: GridSx = {
  width: '250px',
  height: '250px',
};

export default function PopularDestinations() {
  // TODO: Implement usePopularDestinationsSWR
  // const { data: popularDestinations } = usePopularDestinationsSWR({ limit: 4 });
  const popularDestinations: PopularDestination[] | undefined = undefined as
    | PopularDestination[]
    | undefined;

  const t = useTranslations('Flights');
  return (
    <Stack gap={2}>
      <Typography variant="h4">Popular destinations</Typography>
      <Grid container spacing={2} flexGrow={1} justifyContent="space-between">
        {popularDestinations
          ? popularDestinations.map((destination) => {
              let flightCount;
              if (destination.flightCount === 0) {
                flightCount = t('noFlights');
              } else if (destination.flightCount === 1) {
                flightCount = t('oneFlight');
              } else {
                flightCount = t('pluralFlights', { flights: destination.flightCount });
              }
              return (
                <Grid item xs={12} sm={6} md={3} key={destination.id} sx={{ ...gridItemSx }}>
                  <LocationCard
                    title={destination.name}
                    subtitle={flightCount}
                    image={destination.image}
                  />
                </Grid>
              );
            })
          : Array.from({ length: 4 }).map((_, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Grid item xs={12} sm={6} md={3} key={index} sx={{ ...gridItemSx }}>
                <LocationCard />
              </Grid>
            ))}
      </Grid>
    </Stack>
  );
}
