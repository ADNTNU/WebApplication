import { FilterTypes } from '../filters';

export type FilterProps<FilterType extends FilterTypes, Filter> = Omit<FilterType, 'value'> & {
  filterKey: keyof Filter;
  labelId: string;
  defaultValue: FilterType['value'];
};
