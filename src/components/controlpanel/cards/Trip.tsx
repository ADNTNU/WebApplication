import React from 'react';
import { Divider, Stack } from '@mui/material';

type TripProps = {
  token: string;
};

function Trip(props: TripProps) {
  const { token } = props;
  return (
    <Stack direction="column">
      <div>trip</div>
      <div>sip</div>
    </Stack>
  );
}

export default Trip;
