'use client';

import { useState } from 'react';
import ControlPanelMenu from '@components/controlpanel/ControlPanelMenu';
import Controls from '@/components/controlpanel/controls';
import { Divider, Stack } from '@mui/material';
import controlpanelPages from '@components/controlpanel/pages';
import { useSession } from 'next-auth/react';

function ControlPanel() {
  const { data: session } = useSession();

  const [test, setTest] = useState<(typeof controlpanelPages)[keyof typeof controlpanelPages]>(
    controlpanelPages.PRICESANDPROVIDERS,
  );

  const handleClickTest = (type: (typeof controlpanelPages)[keyof typeof controlpanelPages]) => {
    setTest(type);
  };

  return (
    <Stack direction="row" spacing={4}>
      <ControlPanelMenu onClick={handleClickTest} />
      <Divider orientation="vertical" flexItem />
      <Controls type={test} token={session?.token} />
    </Stack>
  );
}

export default ControlPanel;
