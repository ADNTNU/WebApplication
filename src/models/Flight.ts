import { Airline } from './Airline';
import { Airport, AirportSearchResult } from './Airport';

export type Flight = {
  id: number;
  name: string;
  fromAirport: Airport;
  toAirport: Airport;
  airline: Airline;
  departureDate: Date;
  arrivalDate: Date;
};

export type FlightSearchResult = {
  id: number;
  name: string;
  fromAirport: AirportSearchResult;
  toAirport: AirportSearchResult;
  airline: Airline;
  departureDate: Date;
  arrivalDate: Date;
};
