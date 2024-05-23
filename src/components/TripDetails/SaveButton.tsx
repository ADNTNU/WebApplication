'use client';

import { Button, Paper } from '@mui/material';
import { useSession } from 'next-auth/react';
import capitalizeFirstLetter from '@utils/capitalizeFirstLetter';
import useSavedTripByTripIdSWR from './useSavedTripByTripId';

type SaveButtonProps = {
  tripId: number;
  serverAction: (token: string, tripId: number) => Promise<void>;
  localizedDeleteText: string;
  localizedSaveText: string;
};

export default function SaveButton(props: SaveButtonProps) {
  const { tripId, serverAction: postSaved, localizedDeleteText, localizedSaveText } = props;
  const { data: session } = useSession();
  const token = session?.token;

  const { data } = useSavedTripByTripIdSWR({ token, tripId });
  const tripSaved = !!data;
  return token ? (
    <Paper sx={{ padding: 2 }}>
      <Button onClick={() => postSaved(token, tripId)}>
        {tripSaved
          ? capitalizeFirstLetter(localizedDeleteText)
          : capitalizeFirstLetter(localizedSaveText)}
      </Button>
    </Paper>
  ) : null;
}
