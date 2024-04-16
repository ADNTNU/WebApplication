'use client';

import SearchFieldContext, { SearchFieldValue } from '@contexts/SearchFieldContext';
import useDebounce from '@hooks/useDebounce';
import { Backdrop } from '@mui/material';
import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';

type SearchFieldWrapperProps = {
  children: ReactNode;
};

export default function SearchFieldProvider(props: SearchFieldWrapperProps) {
  const { children } = props;

  const obstructorRef = useRef<HTMLDivElement>(null);
  const obstructedRef = useRef<HTMLDivElement>(null);
  const [showHeaderSearchField, setShowHeaderSearchField] = useState(false);
  const [value, setValue] = useState<SearchFieldValue | null>(null);
  const [focusedInputId, setFocusedInputId] = useState<string | null>(null);
  const [active, setActive] = useState(false);
  const [validDate, setValidDate] = useState(false);
  const [roundTrip, setRoundTrip] = useState(false);
  const debouncedActive = useDebounce(active, 50);

  const checkObstruction = useCallback(() => {
    if (obstructorRef.current && obstructedRef.current) {
      const obstructorRect = obstructorRef.current.getBoundingClientRect();
      const obstructedRect = obstructedRef.current.getBoundingClientRect();

      // if (obstructorRect.bottom > obstructedRect.bottom) {
      if (obstructorRect.bottom > obstructedRect.top) {
        setShowHeaderSearchField(true);
        if (
          focusedInputId &&
          (obstructedRef.current === document.activeElement ||
            obstructedRef.current.contains(document.activeElement))
        ) {
          if (obstructorRef.current.id === focusedInputId) {
            obstructorRef.current.focus();
          } else {
            obstructorRef.current.querySelector<HTMLElement>(`#${focusedInputId}`)?.focus();
          }
        }
      } else {
        setShowHeaderSearchField(false);
        if (
          focusedInputId &&
          (obstructorRef.current === document.activeElement ||
            obstructorRef.current.contains(document.activeElement))
        ) {
          if (obstructedRef.current.id === focusedInputId) {
            obstructedRef.current.focus();
          } else {
            obstructedRef.current.querySelector<HTMLElement>(`#${focusedInputId}`)?.focus();
          }
        }
      }
    } else {
      setShowHeaderSearchField(true);
    }
  }, [obstructorRef, obstructedRef, focusedInputId]);

  useEffect(() => {
    checkObstruction();
    window.addEventListener('scroll', checkObstruction);

    return () => {
      window.removeEventListener('scroll', checkObstruction);
    };
  }, [checkObstruction]);

  const searchFieldContextValue = useMemo(() => {
    return {
      showHeaderSearchField,
      obstructorRef,
      obstructedRef,
      value,
      setValue,
      focusedInputId,
      setFocusedInputId,
      active,
      setActive,
      validDate,
      setValidDate,
      roundTrip,
      setRoundTrip,
    };
  }, [showHeaderSearchField, value, focusedInputId, active, validDate, roundTrip]);

  return (
    <SearchFieldContext.Provider value={searchFieldContextValue}>
      <Backdrop
        open={debouncedActive}
        onClick={() => setActive(false)}
        sx={{ zIndex: (theme) => theme.zIndex.appBar + 1 }}
      />
      {children}
    </SearchFieldContext.Provider>
  );
}
