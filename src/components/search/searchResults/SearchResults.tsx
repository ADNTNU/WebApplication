import { TripSearchResult } from '@models/Trip';
import { Stack } from '@mui/material';
import SearchResult from './SearchResult';

type SearchResultsProps = {
  trips?: TripSearchResult[];
};

export default function SearchResults(props: SearchResultsProps) {
  let { trips } = props;

  const tempData: TripSearchResult = {
    id: 2134,
    minPrice: {
      value: 1234,
      currency: 'NOK',
    },
    leaveFlightInitial: {
      airline: {
        id: 3123124,
        name: 'Temp Airline',
        logo: 'https://www.svgrepo.com/show/522436/plane.svg',
      },
      id: 4312,
      fromAirport: {
        code: 'OSL',
        id: 231894,
        location: {
          id: 89321,
          name: 'Oslo',
          country: 'Norway',
        },
        name: 'Oslo Airport',
      },
      toAirport: {
        code: 'AES',
        id: 231894,
        location: {
          id: 89321,
          name: 'Alesund',
          country: 'Norway',
        },
        name: 'Alesund Airport Vigra',
      },
      departureDate: new Date(Date.now() - 43 * 60 * 1000),
      arrivalDate: new Date(),
      name: 'Temp Flight',
    },
    returnFlightInitial: {
      airline: {
        id: 3123124,
        name: 'Temp Airline 2',
        logo: 'https://www.svgrepo.com/show/522436/plane.svg',
      },
      id: 4312,
      fromAirport: {
        code: 'AES',
        id: 231894,
        location: {
          id: 89321,
          name: 'Alesund',
          country: 'Norway',
        },
        name: 'Alesund Airport Vigra',
      },
      toAirport: {
        code: 'OSL',
        id: 231894,
        location: {
          id: 89321,
          name: 'Oslo',
          country: 'Norway',
        },
        name: 'Oslo Airport',
      },
      departureDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      arrivalDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 31 * 60 * 1000),
      name: 'Temp Flight',
    },
  };

  if (tempData && !trips) {
    trips = Array.from({ length: 10 }).map(() => tempData);
  }

  return (
    <Stack width="100%" gap={2}>
      {trips
        ? trips.map((trip) => <SearchResult key={trip.id} trip={trip} />)
        : Array.from({ length: 10 }).map(() => <SearchResult key="searchResultSkeleton" />)}
    </Stack>
  );
}
