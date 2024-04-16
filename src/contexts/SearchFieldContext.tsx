import { Dayjs } from 'dayjs';
import { Dispatch, RefObject, SetStateAction, createContext } from 'react';

export type SearchFieldValue = {
  from?: string;
  to?: string;
  fromDate?: Dayjs | null;
  toDate?: Dayjs | null;
};

type SearchFieldContextType = {
  showHeaderSearchField: boolean;
  // setShowSearchField: Dispatch<SetStateAction<boolean>>;
  obstructorRef: RefObject<HTMLDivElement>;
  obstructedRef: RefObject<HTMLDivElement>;
  value: SearchFieldValue | null;
  setValue: Dispatch<SetStateAction<SearchFieldValue | null>>;
  focusedInputId: string | null;
  setFocusedInputId: Dispatch<SetStateAction<string | null>>;
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  validDate: boolean;
  setValidDate: Dispatch<SetStateAction<boolean>>;
  roundTrip: boolean;
  setRoundTrip: Dispatch<SetStateAction<boolean>>;
};

const SearchFieldContext = createContext<SearchFieldContextType | undefined>(undefined);

export default SearchFieldContext;
