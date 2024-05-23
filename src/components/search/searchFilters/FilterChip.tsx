import { Chip } from '@mui/material';
import { ComponentProps } from 'react';
import {
  BooleanFilterType,
  BooleanFilters,
  FilterTypes,
  Filters,
  NumberFilterType,
  NumberFilters,
  RangeFilterType,
  RangeFilters,
  booleanKeys,
  numberKeys,
  rangeKeys,
} from './filters';

type FilterPropsWithStringLabel = Omit<ComponentProps<typeof Chip>, 'label'> & {
  label: string;
};

type FunctionProperties = {
  onDelete: () => void;
  openFilter: (key: keyof Filters) => void;
};

type FilterChipProps<FilterType extends FilterTypes, Filters> = FilterType &
  FunctionProperties & {
    filterKey: keyof Filters;
  };

type KeySpecificChipProps<FilterType extends FilterTypes, Filters> = Omit<
  ComponentProps<typeof Chip>,
  'label'
> &
  Omit<FilterChipProps<FilterType, Filters>, keyof FunctionProperties>;

function RangeChip(props: KeySpecificChipProps<RangeFilterType, RangeFilters>) {
  const { label, value, filterKey, type, ...muiProps } = props;
  const from = value ? value[0] : null;
  const to = value ? value[1] : null;
  // TODO: Internationalize label value
  let newLabel = value ? `${label}: ${from}-${to}` : label;

  if (from === to) {
    newLabel = `${label}: ${from}`;
  }

  return <Chip {...muiProps} label={newLabel} />;
}

function NumberChip(props: KeySpecificChipProps<NumberFilterType, NumberFilters>) {
  const { label, value, filterKey, type, ...muiProps } = props;
  // TODO: Internationalize label value
  const newLabel = value ? `${label}: ${value}` : label;

  return <Chip {...muiProps} label={newLabel} />;
}

function BooleanChip(props: KeySpecificChipProps<BooleanFilterType, BooleanFilters>) {
  const { label, value, filterKey, ...muiProps } = props;
  // TODO: Internationalize label
  const newLabel = value ? `${label}: Yes` : `${label}: No`;

  return <Chip {...muiProps} label={newLabel} />;
}

export default function FilterChip(props: FilterChipProps<FilterTypes, Filters>) {
  const { onDelete, openFilter, ...propsWithoutFunctions } = props;
  const { label, value, filterKey } = propsWithoutFunctions;

  const muiProps: FilterPropsWithStringLabel = {
    label,
    clickable: true,
    variant: 'outlined',
    onClick: () => openFilter(filterKey),
    onDelete: value !== null ? onDelete : undefined,
    sx: { m: 0.5 },
  };

  if (value === null) {
    return <Chip {...muiProps} />;
  }

  const customChipProps: KeySpecificChipProps<FilterTypes, Filters> = {
    ...propsWithoutFunctions,
    ...muiProps,
  };
  if (rangeKeys.includes(filterKey)) {
    return (
      <RangeChip {...(customChipProps as KeySpecificChipProps<RangeFilterType, RangeFilters>)} />
    );
  }
  if (booleanKeys.includes(filterKey)) {
    return (
      <BooleanChip
        {...(customChipProps as KeySpecificChipProps<BooleanFilterType, BooleanFilters>)}
      />
    );
  }
  if (numberKeys.includes(filterKey)) {
    return (
      <NumberChip {...(customChipProps as KeySpecificChipProps<NumberFilterType, NumberFilters>)} />
    );
  }
  console.error(`Filter key ${filterKey} not found in any filter key arrays`);
  return <Chip {...muiProps} />;
}
