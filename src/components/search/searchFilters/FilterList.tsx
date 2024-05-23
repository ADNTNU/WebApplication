import { Stack } from '@mui/material';
import {
  BooleanFilterType,
  BooleanFilters,
  FilterTypes,
  Filters,
  NumberFilterType,
  NumberFilters,
  RangeFilterType,
  RangeFilters,
  defaultFilters,
} from './filters';
import RangeFilter from './filters/RangeFilter';
import BooleanFilter from './filters/BooleanFilter';
import { FilterProps } from './filters/models';
import NumberFilter from './filters/NumberFilter';

function FilterByType(props: FilterProps<FilterTypes, Filters>) {
  const { type } = props;

  if (type === 'range') {
    return <RangeFilter {...(props as FilterProps<RangeFilterType, RangeFilters>)} />;
  }
  if (type === 'boolean') {
    return <BooleanFilter {...(props as FilterProps<BooleanFilterType, BooleanFilters>)} />;
  }
  if (type === 'number') {
    return <NumberFilter {...(props as FilterProps<NumberFilterType, NumberFilters>)} />;
  }

  const compileCheck: never = type;
  throw new Error(`Invalid, unhandled filter type: ${compileCheck}`);
}

type FilterListProps = {
  filterTranslations: { [key in keyof Filters]: string };
};

export default function FilterList(props: FilterListProps) {
  const { filterTranslations } = props;
  const filterKeys = Object.keys(defaultFilters) as (keyof typeof defaultFilters)[];

  return (
    <Stack>
      {filterKeys.map((key) => {
        const filter = defaultFilters[key];
        const { value, label: initLabel, ...filterProps } = filter;
        const label = filterTranslations[key];
        const labelId = `${key}-filter`;

        return (
          <FilterByType
            key={key}
            filterKey={key}
            label={label}
            labelId={labelId}
            defaultValue={value}
            {...filterProps}
          />
        );
      })}
    </Stack>
  );
}
