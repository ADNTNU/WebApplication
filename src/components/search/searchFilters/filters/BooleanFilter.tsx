'use client';

import { Box, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import useSearchFilterContext from '@hooks/context/useSearchFilterContext';
import { BooleanFilterType, BooleanFilters } from '../filters';
import { FilterProps } from './models';
import FilterWrapper from './FilterWrapper';

export default function BooleanFilter(props: FilterProps<BooleanFilterType, BooleanFilters>) {
  const { filterKey, labelId, label, defaultValue } = props;

  const { filters, setBooleanFilter, clearSelected, resetSelected } = useSearchFilterContext();
  const { value } = filters[filterKey];

  return (
    <FilterWrapper
      labelId={labelId}
      label={label}
      filterKey={filterKey}
      clearFilter={() => clearSelected(filterKey)}
      resetFilter={defaultValue !== null ? () => resetSelected(filterKey) : undefined}
    >
      <Box>
        <FormControl>
          <RadioGroup
            aria-labelledby={labelId}
            value={value}
            name="radio-buttons-group"
            onChange={(_, newValue) => {
              setBooleanFilter(filterKey, newValue === 'true');
            }}
          >
            {/* TODO: Internationalize labels */}
            <FormControlLabel value control={<Radio />} label="Yes" aria-labelledby={labelId} />
            <FormControlLabel
              value={false}
              control={<Radio />}
              label="No"
              aria-labelledby={labelId}
            />
          </RadioGroup>
        </FormControl>
      </Box>
    </FilterWrapper>
  );
}
