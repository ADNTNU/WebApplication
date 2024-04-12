'use client';

import useSearchFieldContext from '@hooks/context/useSearchFieldContext';
import SearchField, { SearchFieldProps } from './SearchField';

export default function OptionalSearchField(props: SearchFieldProps) {
  const { showSearchField } = useSearchFieldContext();

  if (!showSearchField) {
    return null;
  }

  return <SearchField {...props} />;
}
