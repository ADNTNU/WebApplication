type FilterType = 'boolean' | 'number' | 'range';

export type ValuesFromType<T> = T extends FilterType
  ? T extends 'range'
    ? [number, number]
    : T extends 'boolean'
      ? boolean
      : T extends 'number'
        ? number
        : never
  : never;

type FilterTemplate = {
  [key: string]: {
    value: ValuesFromType<FilterType> | null;
    label: string;
    type: FilterType;
  };
};

const templateFilters = {
  stopCount: { value: [1, 2], type: 'range', label: '' },
  price: { value: null, type: 'range', label: '' },
  totalDuration: { value: null, type: 'range', label: '' },
  inAirDuration: { value: null, type: 'range', label: '' },
  layoverDuration: { value: null, type: 'range', label: '' },
} satisfies FilterTemplate;

export type Filters = {
  [key in keyof typeof templateFilters]: Omit<(typeof templateFilters)[key], 'value'> & {
    value: ValuesFromType<(typeof templateFilters)[key]['type']> | null;
  };
};

export const defaultFilters: Filters = { ...templateFilters } as const;

export type LabelType = {
  [key in keyof Filters]: (typeof templateFilters)[key]['label'];
};

export type RangeFilters = {
  [key in keyof Filters as (typeof templateFilters)[key]['type'] extends 'range'
    ? key
    : never]: Filters[key];
};

export type BooleanFilters = {
  [key in keyof Filters as (typeof templateFilters)[key]['type'] extends 'boolean'
    ? key
    : never]: Filters[key];
};

export type NumberFilters = {
  [key in keyof Filters as (typeof templateFilters)[key]['type'] extends 'number'
    ? key
    : never]: Filters[key];
};
