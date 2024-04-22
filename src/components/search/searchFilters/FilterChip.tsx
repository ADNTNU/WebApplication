import { Chip } from '@mui/material';
import { ComponentProps } from 'react';
import { Filters, RangeFilters } from './filters';

type FilterPropsWithStringLabel = Omit<ComponentProps<typeof Chip>, 'label'> & {
  label: string;
};

type FilterChipProps = Filters[keyof Filters] & {
  filterKey: keyof Filters;
  onDelete: () => void;
  setRangeFilter: (
    key: keyof RangeFilters,
    value: RangeFilters[keyof RangeFilters]['value'],
  ) => void;
};

type KeySpecificChipProps = Omit<ComponentProps<typeof Chip>, 'label'> &
  Omit<FilterChipProps, 'onDelete'>;

function StopCountChip(props: KeySpecificChipProps) {
  const { label, value, setRangeFilter, filterKey, type, ...muiProps } = props;
  const from = value ? value[0] : null;
  const to = value ? value[1] : null;

  const newLabel = value ? `${label}: ${from}-${to}` : label;

  if (value === null) {
    return <Chip {...muiProps} />;
  }
  return <Chip {...muiProps} label={newLabel} />;
}

export default function FilterChip(props: FilterChipProps) {
  const { onDelete, ...propsWithoutOnDelete } = props;
  const { label, value, filterKey } = propsWithoutOnDelete;

  const muiProps: FilterPropsWithStringLabel = {
    label,
    clickable: true,
    variant: 'outlined',
    // onClick: handleClick
    onDelete: value !== null ? onDelete : undefined,
    sx: { m: 0.5 },
  };

  const customChipProps: KeySpecificChipProps = {
    ...propsWithoutOnDelete,
    ...muiProps,
  };

  if (value === null) {
    return <Chip {...muiProps} />;
  }

  switch (filterKey) {
    case 'stopCount':
      return <StopCountChip {...customChipProps} />;
    default:
      return <Chip {...muiProps} />;
  }
}
