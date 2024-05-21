'use client';

import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import SearchFilterContext from '@contexts/SearchFilterContext';
import {
  // BooleanFilters,
  Filters,
  // NumberFilters,
  RangeFilters,
  defaultFilters,
} from './filters';

type SearchFilterProviderProps = {
  children: ReactNode;
  filterTranslations: { [key in keyof Filters]: string };
};

export default function SearchFilterProvider(props: SearchFilterProviderProps) {
  const { children, filterTranslations } = props;

  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const translateFilters = useCallback(() => {
    setFilters((prevFilters) => {
      const newFilters = Object.keys(prevFilters).reduce(
        (acc, key) => {
          const filterKey = key as keyof Filters;
          let returnAcc = acc;

          if (filterKey in filterTranslations) {
            const prevFilter = prevFilters[filterKey];

            const filterObj: Filters[typeof filterKey] = {
              type: prevFilter.type,
              value: prevFilter.value,
              label: filterTranslations[filterKey],
            } as const;

            if (!returnAcc) {
              returnAcc = { [filterKey]: filterObj };
            } else {
              returnAcc[filterKey] = filterObj;
            }
          }

          return returnAcc;
        },
        undefined as Partial<Filters> | undefined,
      );

      if (!newFilters || !Object.keys(newFilters).length) {
        throw new Error('No filters found');
      }

      return newFilters as Filters;
    });
  }, [filterTranslations]);

  useEffect(() => {
    translateFilters();
  }, [translateFilters]);

  // const setBooleanFilter = useCallback(
  //   (key: keyof BooleanFilters, value: BooleanFilters[keyof BooleanFilters]['value']) => {
  //     setFilters((prevFilters) => ({
  //       ...prevFilters,
  //       [key]: { ...prevFilters[key], value },
  //     }));
  //   },
  //   [],
  // );

  // const setNumberFilter = useCallback(
  //   (key: keyof NumberFilters, value: NumberFilters[keyof NumberFilters]['value']) => {
  //     setFilters((prevFilters) => ({
  //       ...prevFilters,
  //       [key]: { ...prevFilters[key], value },
  //     }));
  //   },
  //   [],
  // );

  const setRangeFilter = useCallback(
    (key: keyof RangeFilters, value: RangeFilters[keyof RangeFilters]['value']) => {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [key]: { ...prevFilters[key], value },
      }));
    },
    [],
  );

  const clearSelected = useCallback((key: keyof Filters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: { ...prevFilters[key], value: null },
    }));
  }, []);

  const SearchFiltersProviderValue = useMemo(() => {
    return {
      filters,
      setRangeFilter,
      clearSelected,
    };
  }, [filters, setRangeFilter, clearSelected]);

  return (
    <SearchFilterContext.Provider value={SearchFiltersProviderValue}>
      {children}
    </SearchFilterContext.Provider>
  );
}
