import SearchFilterContext from '@contexts/SearchFilterContext';
import { useContext } from 'react';

const useSearchFilterContext = () => {
  const searchFilterContext = useContext(SearchFilterContext);
  if (searchFilterContext === undefined) {
    throw new Error('SearchFieldContext must be inside a SearchFilterProvider');
  }
  return searchFilterContext;
};

export default useSearchFilterContext;
