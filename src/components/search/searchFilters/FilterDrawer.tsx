'use client';

import useSearchFilterContext from '@hooks/context/useSearchFilterContext';
import { Box, Button, Divider, Drawer, Paper, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ReactNode } from 'react';

type FilterDrawerProps = {
  filterList: ReactNode;
};

export default function FilterDrawer(props: FilterDrawerProps) {
  const { filterList } = props;
  const { drawerOpen, setDrawerOpen, drawerRef } = useSearchFilterContext();

  return (
    <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)} ref={drawerRef}>
      <Box sx={{ maxWidth: 600, padding: 2 }} position="relative">
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6" gutterBottom>
            Filters
          </Typography>
          <Button onClick={() => setDrawerOpen(false)}>
            <CloseIcon />
          </Button>
        </Stack>
        <Divider />
        {filterList}
        <Box
          component={Paper}
          position="sticky"
          bottom={0}
          display="flex"
          justifyContent="end"
          height={60}
          width="100%"
        >
          <Button>Apply filter</Button>
        </Box>
      </Box>
    </Drawer>
  );
}
