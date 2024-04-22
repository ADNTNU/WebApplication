import { Filters, RangeFilters } from '@components/search/searchFilters/filters';
import { createContext } from 'react';

type SearchFilterContextType = {
  filters: Filters;
  // setBooleanFilter: (
  //   key: keyof BooleanFilters,
  //   value: BooleanFilters[keyof BooleanFilters]['value'],
  // ) => void;
  // setNumberFilter: (
  //   key: keyof NumberFilters,
  //   value: NumberFilters[keyof NumberFilters]['value'],
  // ) => void;
  setRangeFilter: (
    key: keyof RangeFilters,
    value: RangeFilters[keyof RangeFilters]['value'],
  ) => void;
  clearSelected: (key: keyof Filters) => void;
};

const SearchFilterContext = createContext<SearchFilterContextType | undefined>(undefined);

export default SearchFilterContext;
