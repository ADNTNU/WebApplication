'use client';

import { Flight, FlightSearchResult } from '@models/Flight';
import { Box, Button, Collapse, Paper, Skeleton, Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { ComponentProps, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
// eslint-disable-next-line import/no-cycle
import FlightInfo from './FlightInfo';

type RouteInfoProps = {
  firstFlight?: Flight | FlightSearchResult | null;
  lastFlight?: Flight | FlightSearchResult | null;
  flightIntervals?: FlightSearchResult[] | null;
  fontSize: ComponentProps<typeof Typography>['fontSize'];
};

export default function RouteInfo(props: RouteInfoProps) {
  const { firstFlight, flightIntervals, lastFlight, fontSize } = props;
  const flights = [firstFlight, ...(flightIntervals ?? []), lastFlight];

  const [open, setOpen] = useState(false);

  const at = useTranslations('actions');
  const tripTranslations = useTranslations('common.trip');

  const expandString = `${at('show')} ${tripTranslations('allStops')}`;
  const collapseString = `${at('hide')} ${tripTranslations('allStops')}`;

  if (!flights?.length) {
    return (
      <Stack minWidth="60px" alignItems="center">
        <Skeleton width="60%" variant="text" sx={{ fontSize }} />
      </Stack>
    );
  }

  return (
    <Stack alignItems="center" gap={open ? 1 : 0}>
      <Box>
        <Button onClick={() => setOpen(!open)}>
          {open ? (
            <>
              <ExpandLessIcon />
              {collapseString}
            </>
          ) : (
            <>
              <ExpandMoreIcon />
              {expandString}
            </>
          )}
        </Button>
      </Box>
      <Collapse in={open} sx={{ width: '100%' }}>
        <Stack gap={1}>
          {flights.map((flight) => (
            <Paper elevation={3} key={flight?.id}>
              <FlightInfo firstFlight={flight} collapseStops={false} />
            </Paper>
          ))}
        </Stack>
      </Collapse>
    </Stack>
  );
}
