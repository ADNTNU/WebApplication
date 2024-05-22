import {
  BooleanFilters,
  Filters,
  NumberFilters,
  RangeFilters,
} from '@components/search/searchFilters/filters';
import { Dispatch, SetStateAction, createContext } from 'react';

type SearchFilterContextType = {
  filters: Filters;
  drawerOpen: boolean;
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
  drawerRef: React.RefObject<HTMLDivElement>;
  setBooleanFilter: (key: keyof BooleanFilters, value: boolean) => void;
  setNumberFilter: (key: keyof NumberFilters, value: number) => void;
  setRangeFilter: (key: keyof RangeFilters, fromValue?: number, toValue?: number) => void;
  clearSelected: (key: keyof Filters) => void;
  resetSelected: (key: keyof Filters) => void;
  setFocusFilter: (key: keyof Filters) => void;
};

const SearchFilterContext = createContext<SearchFilterContextType | undefined>(undefined);

export default SearchFilterContext;
