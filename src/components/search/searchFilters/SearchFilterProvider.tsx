'use client';

import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import SearchFilterContext from '@contexts/SearchFilterContext';
import {
  BooleanFilters,
  BooleanValue,
  // BooleanFilters,
  Filters,
  NumberFilters,
  NumberValue,
  // NumberFilters,
  RangeFilters,
  RangeValue,
  defaultFilters,
} from './filters';
import getTimedeltaFromHoursMinutes from './timedeltaUtils';

type SearchFilterProviderProps = {
  children: ReactNode;
  filterTranslations: { [key in keyof Filters]: string };
};

export default function SearchFilterProvider(props: SearchFilterProviderProps) {
  const { children, filterTranslations } = props;

  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const translateFilters = useCallback(() => {
    setFilters((prevFilters) => {
      const newFilters = Object.keys(prevFilters).reduce(
        (acc, key) => {
          const filterKey = key as keyof Filters;
          let returnAcc = acc;

          if (filterKey in filterTranslations) {
            const prevFilter = prevFilters[filterKey];
            const { label, ...rest } = prevFilter;

            const filterObj: Filters[typeof filterKey] = {
              label: filterTranslations[filterKey],
              ...rest,
            };

            if (!returnAcc) {
              returnAcc = { [filterKey]: filterObj };
            } else {
              returnAcc = { ...returnAcc, [filterKey]: filterObj };
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

  const setBooleanFilter = useCallback((key: keyof BooleanFilters, value: BooleanValue) => {
    const filterKey = key as keyof Filters;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: { ...prevFilters[filterKey], value },
    }));
  }, []);

  const setNumberFilter = useCallback((key: keyof NumberFilters, value: NumberValue) => {
    const filterKey = key as keyof Filters;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: { ...prevFilters[filterKey], value },
    }));
  }, []);

  const setRangeFilter = useCallback(
    (key: keyof RangeFilters, fromValue?: RangeValue[number], toValue?: RangeValue[number]) => {
      let parsedFrom: number | undefined = fromValue;
      let parsedTo: number | undefined = toValue;

      if (parsedFrom === undefined && parsedTo === undefined) {
        return;
      }

      const oldFrom = filters[key].value?.[0];
      const oldTo = filters[key].value?.[1];
      const filterKey = key;
      const { min, max, type } = defaultFilters[key].options;

      const parsedMin =
        typeof min === 'number' ? min : getTimedeltaFromHoursMinutes(min.hours, min.minutes);
      const parsedMax =
        typeof max === 'number' ? max : getTimedeltaFromHoursMinutes(max.hours, max.minutes);

      if (parsedFrom === undefined) {
        parsedFrom = oldFrom !== undefined ? oldFrom : parsedMin;
      }
      if (parsedTo === undefined) {
        parsedTo = oldTo !== undefined ? oldTo : parsedMax;
      }

      if (type === 'HH:MM') {
        parsedFrom = getTimedeltaFromHoursMinutes(parsedFrom / 60, parsedFrom % 60);
        parsedTo = getTimedeltaFromHoursMinutes(parsedTo / 60, parsedTo % 60);
      }

      if (parsedFrom === oldFrom && parsedTo === oldTo) {
        return;
      }

      if (parsedFrom > parsedTo) {
        const temp = parsedFrom;
        parsedFrom = parsedTo;
        parsedTo = temp;
      }
      if (parsedFrom < parsedMin) {
        parsedFrom = parsedMin;
      }
      if (parsedTo > parsedMax) {
        parsedTo = parsedMax;
      }

      const parsedValue = [parsedFrom, parsedTo];

      setFilters((prevFilters) => ({
        ...prevFilters,
        [filterKey]: { ...prevFilters[filterKey], value: parsedValue },
      }));
    },
    [filters],
  );

  const clearSelected = useCallback((key: keyof Filters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: { ...prevFilters[key], value: null },
    }));
  }, []);

  const resetSelected = useCallback((key: keyof Filters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: { ...prevFilters[key], value: defaultFilters[key].value },
    }));
  }, []);

  const setFocusFilter = useCallback((key: keyof Filters) => {
    setDrawerOpen(true);
    setTimeout(() => {
      const labelId = `${key}-filter`;
      if (drawerRef.current) {
        const filter = drawerRef.current.querySelector(`[data-filter-key="${key}"]`);
        if (filter) {
          filter.scrollIntoView({ behavior: 'smooth', block: 'start' });
          const focusElement = filter.querySelector<HTMLElement>(`[aria-labelledby="${labelId}"]`);
          if (focusElement) {
            focusElement.focus();
          }
        }
      }
    }, 0);
  }, []);

  const SearchFiltersProviderValue = useMemo(() => {
    return {
      filters,
      setRangeFilter,
      setBooleanFilter,
      setNumberFilter,
      clearSelected,
      resetSelected,
      drawerOpen,
      setDrawerOpen,
      drawerRef,
      setFocusFilter,
    };
  }, [
    filters,
    setRangeFilter,
    setBooleanFilter,
    setNumberFilter,
    clearSelected,
    resetSelected,
    drawerOpen,
    setFocusFilter,
  ]);

  return (
    <SearchFilterContext.Provider value={SearchFiltersProviderValue}>
      {children}
    </SearchFilterContext.Provider>
  );
}
