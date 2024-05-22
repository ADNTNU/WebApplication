import { LocationOrAirportOption } from '@models/DTO/LocationOrAirport';
import { Dayjs } from 'dayjs';
import { Dispatch, RefObject, SetStateAction, createContext } from 'react';

export type SearchFieldValue = {
  from?: LocationOrAirportOption | null;
  to?: LocationOrAirportOption | null;
  fromDate?: Dayjs | null;
  toDate?: Dayjs | null;
};

export const defaultValues = {
  showHeaderSearchField: false,
  value: null,
  focusedInputId: null,
  active: false,
  roundTrip: true,
  // dateTextValue: null,
  validDate: true,
  // fromTextValue: null,
  validFrom: true,
  // toTextValue: null,
  validTo: true,
} as const;

export type ResetOptions = {
  [K in keyof typeof defaultValues]?:
    | 'default'
    | ((typeof defaultValues)[K] extends boolean
        ? boolean
        : (typeof defaultValues)[K] extends null
          ? null
          : never);
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
  // dateTextValue: string | null;
  // setDateTextValue: Dispatch<SetStateAction<string | null>>;
  reset: (props?: ResetOptions) => void;
  // fromTextValue: string | null;
  // setFromTextValue: Dispatch<SetStateAction<string | null>>;
  validFrom: boolean;
  setValidFrom: Dispatch<SetStateAction<boolean>>;
  // toTextValue: string | null;
  // setToTextValue: Dispatch<SetStateAction<string | null>>;
  validTo: boolean;
  setValidTo: Dispatch<SetStateAction<boolean>>;
};

const SearchFieldContext = createContext<SearchFieldContextType | undefined>(undefined);

export default SearchFieldContext;
