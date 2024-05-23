import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export type InputKey = 'date' | 'from' | 'generic' | 'search' | 'to';

export type InputMap = {
  [key in InputKey]: {
    id: string;
    label: string;
    placeholder?: string;
    ownerId?: string;
  };
};

const inputs: InputMap = {
  from: {
    id: 'search-field-input-from',
    label: 'Fra?',
    placeholder: 'Legg til sted',
    ownerId: 'autocomplete-from',
  },
  to: {
    id: 'search-field-input-to',
    label: 'Til?',
    placeholder: 'Legg til sted',
    ownerId: 'autocomplete-to',
  },
  date: { id: 'search-field-input-date', label: 'Når?', placeholder: 'DD/MM/YYYY' },
  search: { id: 'search-field-button-search', label: 'Søk' },
  generic: { id: 'search-field-input-generic', label: 'Søk etter flyreiser' },
};

export default inputs;

type ComponentsSearchFieldTranslations =
  | Awaited<ReturnType<typeof getTranslations<'components.searchField'>>>
  | ReturnType<typeof useTranslations<'components.searchField'>>;

export function getTranslatedInputs(searchFieldT: ComponentsSearchFieldTranslations): InputMap {
  return Object.keys(inputs).reduce((acc, key) => {
    const inputKey = key as InputKey;
    acc[inputKey] = {
      ...acc[inputKey],
      label: searchFieldT(`inputs.${inputKey}.label`),
      placeholder: searchFieldT(`inputs.${inputKey}.placeholder`),
    };
    return acc;
  }, inputs);
}
