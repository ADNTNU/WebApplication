import { Location, LocationSearchResult } from './Location';

export type Airport = {
  id: number;
  name: string;
  code: string;
  location: Location;
};

export type AirportSearchResult = {
  id: number;
  name: string;
  code: string;
  location: LocationSearchResult;
};
