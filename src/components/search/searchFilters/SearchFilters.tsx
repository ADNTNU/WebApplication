'use client';

import { Paper, Skeleton, Stack } from '@mui/material';
import useSearchFilterContext from '@hooks/context/useSearchFilterContext';
import FilterChip from './FilterChip';
import { Filters } from './filters';

// type SearchFiltersProps = {
// };

export default function SearchFilters(/* props: SearchFiltersProps */) {
  // const { } = props;
  const { /* setNumberFilter, */ setRangeFilter, /*  setBooleanFilter, */ filters, clearSelected } =
    useSearchFilterContext();

  return (
    <Stack component={Paper} sx={{ p: 2, borderRadius: 2 }} direction="row">
      {Object.entries(filters).map(([key, filter]) => {
        const filterKey = key as keyof Filters;
        const { label } = filter;
        return label === '' ? (
          <Skeleton
            key={key}
            variant="rectangular"
            sx={{
              height: (theme) => theme.spacing(3),
              width: 60,
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
            onDelete={() => clearSelected(filterKey)}
          />
        );
      })}
    </Stack>
  );
}
