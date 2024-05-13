'use client';

import { useState } from 'react';
import Menu from '@components/controlpanel/menu';
import Controls from '@/components/controlpanel/controls';
import { Divider, Stack } from '@mui/material';
import { ControlpanelTypes } from '@/constants/ControlpanelContext';

function maintest() {
  const [test, setTest] = useState<(typeof ControlpanelTypes)[keyof typeof ControlpanelTypes]>(
    ControlpanelTypes.USER,
  );

  const handleClickTest = (type: (typeof ControlpanelTypes)[keyof typeof ControlpanelTypes]) => {
    setTest(type);
  };

  return (
    <Stack direction="row">
      <Menu onClick={handleClickTest} />
      <Divider orientation="vertical" flexItem />
      <Controls type={test} />
    </Stack>
  );
}

export default maintest;
