import { Provider } from './Provider';

export type Price = {
  id: number;
  currency: string;
  price: number;
  provider: Provider;
};

export type PriceSearchResult = {
  currency: string;
  price: number;
};
