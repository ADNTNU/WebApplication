'use client';

import { Slider, Stack, TextField } from '@mui/material';
import useSearchFilterContext from '@hooks/context/useSearchFilterContext';
import { useEffect, useMemo, useState } from 'react';
import { NumberFilterType, NumberFilters } from '../filters';
import { FilterProps } from './models';
import FilterWrapper from './FilterWrapper';
import getTimedeltaFromHoursMinutes from '../timedeltaUtils';

export default function NumberFilter(props: FilterProps<NumberFilterType, NumberFilters>) {
  const { filterKey, labelId, label, options, defaultValue } = props;
  const { min, max, step } = options;

  const { filters, setNumberFilter, clearSelected, resetSelected } = useSearchFilterContext();
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

  const parsedStringValue = useMemo(() => {
    // @ts-expect-error - This results in a compile error, when no NumberFilters are defined
    return parsedValue.toString();
  }, [parsedValue]);

  const [inputValue, setInputValue] = useState<string>(parsedStringValue);

  useEffect(() => {
    setInputValue(parsedStringValue);
  }, [parsedStringValue]);

  const handleInputSubmit = (stringValue: string) => {
    try {
      const newValue = parseInt(stringValue, 10);
      if (!Number.isNaN(newValue)) {
        setNumberFilter(filterKey, newValue);
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
      resetFilter={defaultValue !== null ? () => resetSelected(filterKey) : undefined}
    >
      <Stack>
        <TextField
          type="number"
          variant="outlined"
          size="small"
          value={inputValue[0]}
          inputProps={{
            onChange: (e) => {
              setInputValue(e.currentTarget.value);
            },
            onBlur: (e) => {
              handleInputSubmit(e.currentTarget.value);
            },
            onKeyUp: (e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleInputSubmit(e.currentTarget.value);
              }
            },
          }}
        />
        <Slider
          value={parsedValue}
          onChange={(_, newValue) => {
            if (Array.isArray(newValue)) return;
            setNumberFilter(filterKey, newValue);
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
