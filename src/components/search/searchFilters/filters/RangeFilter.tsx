'use client';

import { Stack, TextField } from '@mui/material';
import Slider from '@mui/material/Slider';
import useSearchFilterContext from '@hooks/context/useSearchFilterContext';
import { useEffect, useMemo, useState } from 'react';
import { RangeFilterType, RangeFilters } from '../filters';
import { FilterProps } from './models';
import FilterWrapper from './FilterWrapper';
import getTimedeltaFromHoursMinutes from '../timedeltaUtils';

export default function RangeFilter(props: FilterProps<RangeFilterType, RangeFilters>) {
  const { options, filterKey, labelId, label, defaultValue } = props;
  const { min, max, step } = options;

  const { filters, setRangeFilter, clearSelected, resetSelected } = useSearchFilterContext();
  const { value } = filters[filterKey];
  const parsedMin = useMemo(() => {
    if (typeof min === 'number') return min;
    return getTimedeltaFromHoursMinutes(min.hours, min.minutes);
  }, [min]);
  const parsedMax = useMemo(() => {
    if (typeof max === 'number') return max;
    return getTimedeltaFromHoursMinutes(max.hours, max.minutes);
  }, [max]);
  const parsedStep = useMemo(() => {
    if (typeof step === 'number') return step;
    return getTimedeltaFromHoursMinutes(step.hours, step.minutes);
  }, [step]);

  const parsedValue = useMemo(() => {
    return value || [parsedMin, parsedMax];
  }, [value, parsedMin, parsedMax]);

  const [inputValues, setInputValues] = useState<string[]>(parsedValue.map((v) => v.toString()));

  useEffect(() => {
    setInputValues(parsedValue.map((v) => v.toString()));
  }, [parsedValue]);

  const handleInputSubmit = (index: number, stringValue: string) => {
    try {
      const newValue = parseInt(stringValue, 10);
      if (!Number.isNaN(newValue)) {
        const from = index === 0 ? newValue : undefined;
        const to = index === 1 ? newValue : undefined;
        setRangeFilter(filterKey, from, to);
      }
    } catch (error) {
      console.warn('Invalid number input');
    }
  };

  return (
    <FilterWrapper
      labelId={labelId}
      label={label}
      filterKey={filterKey}
      clearFilter={() => clearSelected(filterKey)}
      resetFilter={defaultValue ? () => resetSelected(filterKey) : undefined}
    >
      <Stack>
        <Stack direction="row" gap={2} justifyContent="space-between">
          <TextField
            type="number"
            variant="outlined"
            size="small"
            value={inputValues[0]}
            inputProps={{
              onChange: (e) => {
                setInputValues([e.currentTarget.value, inputValues[1]]);
              },
              onBlur: (e) => {
                handleInputSubmit(0, e.currentTarget.value);
              },
              onKeyUp: (e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleInputSubmit(0, e.currentTarget.value);
                }
              },
            }}
          />
          <TextField
            type="number"
            variant="outlined"
            size="small"
            value={inputValues[1]}
            inputProps={{
              onChange: (e) => {
                setInputValues([e.currentTarget.value, inputValues[1]]);
              },
              onBlur: (e) => {
                handleInputSubmit(1, e.currentTarget.value);
              },
              onKeyUp: (e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleInputSubmit(1, e.currentTarget.value);
                }
              },
            }}
          />
        </Stack>
        <Slider
          value={parsedValue}
          onChange={(_, newValue) => {
            if (!Array.isArray(newValue) || newValue.length !== 2) return;

            const from = newValue[0];
            const to = newValue[1];

            setRangeFilter(filterKey, from, to);
          }}
          valueLabelDisplay="auto"
          aria-labelledby={labelId}
          min={parsedMin}
          max={parsedMax}
          step={parsedStep}
        />
      </Stack>
    </FilterWrapper>
  );
}
