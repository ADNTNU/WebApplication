import { ISODateString } from 'next-auth';
import { Airline } from './Airline';
import { Airport, AirportSearchResult } from './Airport';

export type Flight = {
  id: number;
  name: string;
  departureAirport: Airport;
  arrivalAirport: Airport;
  airline: Airline;
  departureDate: Date;
  arrivalDate: Date;
};

export type FlightSearchResult = {
  id: number;
  name: string;
  departureAirport: AirportSearchResult;
  arrivalAirport: AirportSearchResult;
  airline: Airline;
  departureDate: ISODateString;
  arrivalDate: ISODateString;
};
