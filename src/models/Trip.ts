import { Flight, FlightSearchResult } from './Flight';
import { Price } from './Price';

export type Trip = {
  id: number;
  minPrice: Price;
  leaveFlightInitial: Flight;
  leaveFlightFinal?: Flight;
  leaveFlightIntervals?: Flight[];
  returnFlightInitial?: Flight;
  returnFlightFinal?: Flight;
  returnFlightIntervals?: Flight[];
};

export type TripSearchResult = {
  id: number;
  minPrice: Price;
  leaveFlightInitial: FlightSearchResult;
  leaveFlightFinal?: FlightSearchResult;
  leaveFlightIntervals?: FlightSearchResult[];
  returnFlightInitial?: FlightSearchResult;
  returnFlightFinal?: FlightSearchResult;
  returnFlightIntervals?: FlightSearchResult[];
};
