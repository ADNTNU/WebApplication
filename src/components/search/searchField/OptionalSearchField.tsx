'use client';
import SearchField, { SearchFieldProps } from './SearchField';
import useSearchFieldContext from '@hooks/context/useSearchFieldContext';

export default function OptionalSearchField(props: SearchFieldProps) {
  const { showSearchField } = useSearchFieldContext();

  if (!showSearchField) {
    return null;
  }

  return <SearchField {...props} />;
}
