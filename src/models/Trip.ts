import { Flight, FlightSearchResult } from './Flight';
import { Price, PriceSearchResult } from './Price';

export type Trip = {
  id: number;
  minPrice: Price;
  leaveInitialFlight: Flight;
  leaveArrivalFlight?: Flight;
  leaveFlightIntervals?: Flight[];
  returnInitialFlight?: Flight;
  returnArrivalFlight?: Flight;
  returnFlightIntervals?: Flight[];
};

export type TripSearchResult = {
  id: number;
  minPrice: PriceSearchResult;
  leaveInitialFlight: FlightSearchResult;
  leaveArrivalFlight: FlightSearchResult | null;
  leaveFlightIntervals: FlightSearchResult[] | null;
  returnInitialFlight: FlightSearchResult | null;
  returnArrivalFlight: FlightSearchResult | null;
  returnFlightIntervals: FlightSearchResult[] | null;
};
