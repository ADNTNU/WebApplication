import { Dispatch, RefObject, SetStateAction, createContext } from 'react';

type SearchFieldContextType = {
  showSearchField: boolean;
  // setShowSearchField: Dispatch<SetStateAction<boolean>>;
  obstructorRef: RefObject<HTMLDivElement>;
  obstructedRef: RefObject<HTMLDivElement>;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

const SearchFieldContext = createContext<SearchFieldContextType | undefined>(undefined);

export default SearchFieldContext;
