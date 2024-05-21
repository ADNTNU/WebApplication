'use client';

import { useState } from 'react';
import Menu from '@components/controlpanel/sideDrawer';
import Controls from '@/components/controlpanel/controls';
import { Divider, Stack } from '@mui/material';
import { ControlpanelTypes } from '@/constants/ControlpanelContext';
import { useSession } from 'next-auth/react';

function maintest() {
  const { data: session } = useSession();

  const [test, setTest] = useState<(typeof ControlpanelTypes)[keyof typeof ControlpanelTypes]>(
    ControlpanelTypes.PRICESANDPROVIDERS,
  );

  const handleClickTest = (type: (typeof ControlpanelTypes)[keyof typeof ControlpanelTypes]) => {
    setTest(type);
  };

  return (
    <Stack direction="row" spacing={4}>
      <Menu onClick={handleClickTest} />
      <Divider orientation="vertical" flexItem />
      <Controls type={test} token={session?.token} />
    </Stack>
  );
}

export default maintest;
