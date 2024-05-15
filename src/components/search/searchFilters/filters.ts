type FilterType = 'boolean' | 'number' | 'range';

export type RangeValue = [number, number];
export type BooleanValue = boolean;
export type NumberValue = number;

export type ValuesFromType<T> = T extends FilterType
  ? T extends 'range'
    ? RangeValue
    : T extends 'boolean'
      ? BooleanValue
      : T extends 'number'
        ? NumberValue
        : never
  : never;

type NumberOptions =
  | {
      min: { hours: number; minutes: number };
      max: { hours: number; minutes: number };
      step: { hours: number; minutes: number };
      type: 'HH:MM';
    }
  | {
      min: number;
      max: number;
      step: number;
      type: 'currency' | 'default';
    };

type RangeOptions = NumberOptions;

type BooleanOptions = undefined;

export type OptionsFromType<T> = T extends 'range'
  ? RangeOptions
  : T extends 'boolean'
    ? BooleanOptions
    : T extends 'number'
      ? NumberOptions
      : never;

type FilterTemplate<
  FilterTypeImpl extends FilterType,
  Keys extends number | string | symbol = string,
> = {
  [key in Keys]: {
    value: ValuesFromType<FilterTypeImpl> | null;
    label: string;
    type: FilterTypeImpl;
    options: OptionsFromType<FilterTypeImpl>;
  };
};

const rangeKeysConst = [
  'stopCount',
  'price',
  'totalDuration',
  'inAirDuration',
  'layoverDuration',
] as const;
export const rangeKeys = [...rangeKeysConst] as string[];
type RangeKeysType = (typeof rangeKeysConst)[number];

const templateRangeFilters = {
  stopCount: {
    value: [1, 2],
    type: 'range',
    label: '',
    options: { min: 0, max: 5, step: 1, type: 'default' },
  },
  price: {
    value: null,
    type: 'range',
    label: '',
    options: { min: 0, max: 20000, step: 100, type: 'currency' },
  },
  totalDuration: {
    value: null,
    type: 'range',
    label: '',
    options: {
      min: { hours: 0, minutes: 0 },
      max: { hours: 60, minutes: 0 },
      step: { hours: 0, minutes: 30 },
      type: 'HH:MM',
    },
  },
  inAirDuration: {
    value: null,
    type: 'range',
    label: '',
    options: {
      min: { hours: 0, minutes: 0 },
      max: { hours: 30, minutes: 0 },
      step: { hours: 0, minutes: 30 },
      type: 'HH:MM',
    },
  },
  layoverDuration: {
    value: null,
    type: 'range',
    label: '',
    options: {
      min: { hours: 0, minutes: 0 },
      max: { hours: 30, minutes: 0 },
      step: { hours: 0, minutes: 30 },
      type: 'HH:MM',
    },
  },
} satisfies FilterTemplate<'range', RangeKeysType>;

const booleanKeysConst = [] as const;
export const booleanKeys = [...booleanKeysConst] as string[];
type BooleanKeysType = (typeof booleanKeysConst)[number];
const templateBooleanFilters = {} satisfies FilterTemplate<'boolean', BooleanKeysType>;

const numberKeysConst = [] as const;
export const numberKeys = [...numberKeysConst] as string[];
type NumberKeysType = (typeof numberKeysConst)[number];
const templateNumberFilters = {} satisfies FilterTemplate<'number', NumberKeysType>;

// export type Filters = {
//   [key in keyof typeof templateBooleanFilters]: Omit<
//     (typeof templateBooleanFilters)[key],
//     'value'
//   > & {
//     value: ValuesFromType<(typeof templateBooleanFilters)[key]['type']> | null;
//   };
// } & {
//   [key in keyof typeof templateNumberFilters]: Omit<
//     (typeof templateNumberFilters)[key],
//     'value'
//   > & {
//     value: ValuesFromType<(typeof templateNumberFilters)[key]['type']> | null;
//   };
// } & {
//   [key in keyof typeof templateRangeFilters]: Omit<(typeof templateRangeFilters)[key], 'value'> & {
//     value: ValuesFromType<(typeof templateRangeFilters)[key]['type']> | null;
//   };
// };

export type RangeFilters = {
  [key in keyof typeof templateRangeFilters]: (typeof templateRangeFilters)[keyof typeof templateRangeFilters];
};
export type RangeFilterType = FilterTemplate<'range'>[number];

export type BooleanFilters = {
  [key in keyof typeof templateBooleanFilters]: (typeof templateBooleanFilters)[keyof typeof templateBooleanFilters];
};
export type BooleanFilterType = FilterTemplate<'boolean'>[number];

export type NumberFilters = {
  [key in keyof typeof templateNumberFilters]: (typeof templateNumberFilters)[keyof typeof templateNumberFilters];
};
export type NumberFilterType = FilterTemplate<'number'>[number];

export type FilterTypes = BooleanFilterType | NumberFilterType | RangeFilterType;

export type Filters = BooleanFilters & NumberFilters & RangeFilters;

export const defaultFilters: Filters = {
  ...templateRangeFilters,
  ...templateBooleanFilters,
  ...templateNumberFilters,
} as const;
