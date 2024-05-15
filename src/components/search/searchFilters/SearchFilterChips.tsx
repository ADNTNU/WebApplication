'use client';

import { Button, Paper, Skeleton, Stack } from '@mui/material';
import useSearchFilterContext from '@hooks/context/useSearchFilterContext';
import TuneIcon from '@mui/icons-material/Tune';
import FilterChip from './FilterChip';
import { Filters } from './filters';

// type SearchFiltersProps = {
// };

export default function SearchFilterSection(/* props: SearchFiltersProps */) {
  // const { } = props;
  const {
    /* setNumberFilter, */ setRangeFilter,
    /*  setBooleanFilter, */ filters,
    clearSelected,
    setDrawerOpen,
    setFocusFilter,
  } = useSearchFilterContext();

  const openFilter = (key: keyof Filters) => () => {
    setFocusFilter(key);
  };

  return (
    <Stack
      component={Paper}
      gap={2}
      sx={{ p: 2, borderRadius: 2 }}
      direction="row"
      justifyContent="space-between"
      position="sticky"
    >
      <Stack direction="row" sx={{ overflowX: 'auto', flexGrow: 1, flexShrink: 1 }}>
        {Object.entries(filters).map(([key, filter]) => {
          const filterKey = key as keyof Filters;
          const { label } = filter;
          return label === '' ? (
            <Skeleton
              key={key}
              variant="rectangular"
              sx={{
                height: (theme) => theme.spacing(3),
                width: 100,
                margin: 1,
                borderRadius: 3,
              }}
            />
          ) : (
            <FilterChip
              key={key}
              {...filter}
              filterKey={filterKey}
              // setNumberFilter={setNumberFilter}
              setRangeFilter={setRangeFilter}
              // setBooleanFilter={setBooleanFilter}
              openFilter={openFilter(filterKey)}
              onDelete={() => clearSelected(filterKey)}
            />
          );
        })}
      </Stack>
      <Button
        sx={{
          flexShrink: 0,
          gap: 1,
          color: (theme) => theme.vars.palette.text.primary,
        }}
        onClick={() => setDrawerOpen(true)}
      >
        <TuneIcon />
        Filter
      </Button>
    </Stack>
  );
}
