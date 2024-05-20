'use client';

import { Grid, Stack, Typography } from '@mui/material';
import { ComponentProps } from 'react';
// import { PopularDestination } from '@models/DTO/Location';
import { useTranslations } from 'next-intl';
import PageSection from '@components/layout/main/PageSection';
import usePopularDestinationsSWR from './usePopularDestinationsSWR';
import LocationCard from './LocationCard';

type GridSx = ComponentProps<typeof Grid>['sx'];

const size = '250px';
const gridItemSx: GridSx = {
  width: size,
  height: size,
};

// const tempPopularDestinations: PopularDestination[] = [
//   {
//     id: 1,
//     name: 'Paris',
//     image: 'https://source.unsplash.com/400x400/?paris',
//     flightCount: 58,
//   },
//   {
//     id: 2,
//     name: 'New York',
//     image: 'https://source.unsplash.com/400x400/?new-york',
//     flightCount: 42,
//   },
//   {
//     id: 3,
//     name: 'Tokyo',
//     image: 'https://source.unsplash.com/400x400/?tokyo',
//     flightCount: 33,
//   },
//   {
//     id: 4,
//     name: 'London',
//     image: 'https://source.unsplash.com/400x400/?london',
//     flightCount: 27,
//   },
// ];

type PopularDestinationsProps = {
  pageSectionProps: Omit<ComponentProps<typeof PageSection>, 'children'>;
};

export default function PopularDestinations(props: PopularDestinationsProps) {
  const { pageSectionProps } = props;
  const { data: popularDestinations } = usePopularDestinationsSWR({ limit: 4 });

  const tPD = useTranslations('components.popularDestinations');
  const t = useTranslations('common.trip');

  return !popularDestinations || popularDestinations.length ? (
    <PageSection {...pageSectionProps}>
      <Stack gap={2}>
        <Typography variant="h4">{tPD('title')}</Typography>
        <Grid container spacing={2} flexGrow={1}>
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
                      sizes={size}
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
    </PageSection>
  ) : null;
}
