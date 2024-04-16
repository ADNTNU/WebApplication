'use client';

import SearchFieldContext, {
  ResetOptions,
  SearchFieldValue,
  defaultValues,
} from '@contexts/SearchFieldContext';
import useDebounce from '@hooks/useDebounce';
import { Backdrop } from '@mui/material';
import { usePathname } from 'next/navigation';
import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';

type SearchFieldWrapperProps = {
  children: ReactNode;
};

export default function SearchFieldProvider(props: SearchFieldWrapperProps) {
  const { children } = props;

  const obstructorRef = useRef<HTMLDivElement>(null);
  const obstructedRef = useRef<HTMLDivElement>(null);
  const [showHeaderSearchField, setShowHeaderSearchField] = useState<boolean>(
    defaultValues.showHeaderSearchField,
  );
  const [value, setValue] = useState<SearchFieldValue | null>(defaultValues.value);
  const [focusedInputId, setFocusedInputId] = useState<string | null>(defaultValues.focusedInputId);
  const [active, setActive] = useState<boolean>(defaultValues.active);
  const [validDate, setValidDate] = useState<boolean>(defaultValues.validDate);
  const [roundTrip, setRoundTrip] = useState<boolean>(defaultValues.roundTrip);
  const [dateTextValue, setDateTextValue] = useState<string | null>(defaultValues.dateTextValue);
  const debouncedActive = useDebounce(active, 50);
  const pathname = usePathname();

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
  }, [checkObstruction, pathname]);

  const reset = useCallback(
    (resetProps?: ResetOptions) => {
      const {
        showHeaderSearchField: resetShowHeaderSearchField,
        value: resetValue,
        focusedInputId: resetFocusedInputId,
        active: resetActive,
        validDate: resetValidDate,
        roundTrip: resetRoundTrip,
      } = resetProps || {};

      if (resetShowHeaderSearchField) {
        setShowHeaderSearchField(defaultValues.showHeaderSearchField);
      }
      if (resetValue) {
        setValue(defaultValues.value);
      }
      if (resetFocusedInputId) {
        setFocusedInputId(defaultValues.focusedInputId);
      }
      if (resetActive) {
        setActive(defaultValues.active);
      }
      if (resetValidDate) {
        setValidDate(defaultValues.validDate);
      }
      if (resetRoundTrip) {
        setRoundTrip(defaultValues.roundTrip);
      }
      checkObstruction();
    },
    [checkObstruction],
  );

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
      dateTextValue,
      setDateTextValue,
      reset,
    };
  }, [
    showHeaderSearchField,
    value,
    focusedInputId,
    active,
    validDate,
    roundTrip,
    dateTextValue,
    reset,
  ]);

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
