'use client';

import { Grid, Stack, Typography } from '@mui/material';
import usePopularDestinationsSWR from './usePopularDestinationsSWR';
import LocationCard from './LocationCard';
import { ComponentProps } from 'react';

type GridSx = ComponentProps<typeof Grid>['sx'];
const gridItemSx: GridSx = {
  width: '250px',
  height: '250px',
};

export default function PopularDestinations() {
  const { data: popularDestinations } = usePopularDestinationsSWR({ limit: 4 });
  return (
    <>
      <Stack gap={2}>
        <Typography variant="h4">Popular destinations</Typography>
        <Grid container spacing={2} flexGrow={1} justifyContent={'space-between'}>
          {popularDestinations
            ? popularDestinations.map((destination) => (
                <Grid item xs={12} sm={6} md={3} key={destination.id} sx={{ ...gridItemSx }}>
                  <LocationCard
                    title={destination.name}
                    // TODO: Internationalize the subtitle
                    subtitle={destination.flightCount.toString() + ' flights'}
                    image={destination.image}
                  />
                </Grid>
              ))
            : Array.from({ length: 4 }).map((_, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Grid item xs={12} sm={6} md={3} key={index} sx={{ ...gridItemSx }}>
                  <LocationCard />
                </Grid>
              ))}
        </Grid>
      </Stack>
    </>
  );
}
