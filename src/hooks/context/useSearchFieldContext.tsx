import SearchFieldContext from '@contexts/SearchFieldContext';
import { useContext } from 'react';

const useSearchFieldContext = () => {
  const searchFieldContext = useContext(SearchFieldContext);
  if (searchFieldContext === undefined) {
    throw new Error('SearchFieldContext must be inside a SearchFieldProvider');
  }
  return searchFieldContext;
};

export default useSearchFieldContext;
