'use client';

import SearchFieldContext from '@contexts/SearchFieldContext';
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';

type SearchFieldWrapperProps = {
  children: ReactNode;
};

export default function SearchFieldProvider(props: SearchFieldWrapperProps) {
  const { children } = props;

  const obstructorRef = useRef<HTMLDivElement>(null);
  const obstructedRef = useRef<HTMLDivElement>(null);
  const [showSearchField, setShowSearchField] = useState(false);
  const [value, setValue] = useState<string>('');

  const checkObstruction = () => {
    if (obstructorRef.current && obstructedRef.current) {
      const obstructorRect = obstructorRef.current.getBoundingClientRect();
      const obstructedRect = obstructedRef.current.getBoundingClientRect();

      if (obstructorRect.bottom > obstructedRect.bottom) {
        setShowSearchField(true);
        if (
          obstructedRef.current === document.activeElement ||
          obstructedRef.current.contains(document.activeElement)
        ) {
          obstructorRef.current.focus();
          obstructorRef.current.querySelector<HTMLElement>('.search-field-input')?.focus();
        }
      } else {
        if (
          obstructorRef.current === document.activeElement ||
          obstructorRef.current.contains(document.activeElement)
        ) {
          obstructedRef.current.focus();
          obstructedRef.current.querySelector<HTMLElement>('.search-field-input')?.focus();
        }
        setShowSearchField(false);
      }
    } else {
      setShowSearchField(true);
    }
  };

  useEffect(() => {
    checkObstruction();
    window.addEventListener('scroll', checkObstruction);
  }, [obstructorRef, obstructedRef]);

  const searchFieldContextValue = useMemo(() => {
    return { showSearchField, obstructorRef, obstructedRef, value, setValue };
  }, [showSearchField, obstructorRef, obstructedRef, value, setValue]);

  return (
    <SearchFieldContext.Provider value={searchFieldContextValue}>
      {children}
    </SearchFieldContext.Provider>
  );
}
