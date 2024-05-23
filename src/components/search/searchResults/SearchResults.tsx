'use client';

import { Alert, Stack } from '@mui/material';
// import useSearchFilterContext from '@hooks/context/useSearchFilterContext';
import { PaginationProps, SearchProps } from '@/apiRoutes';
import { LocationOrAirportOption } from '@models/DTO/LocationOrAirport';
import SearchResult from './SearchResult';
import useSearchSWR from './useSearchSWR';

type SearchResultsProps = PaginationProps &
  SearchProps & {
    locationAutocompleteOptions: LocationOrAirportOption[];
  };

export default function SearchResults(props: SearchResultsProps) {
  const { locationAutocompleteOptions, ...searchParams } = props;

  // const { filters } = useSearchFilterContext();

  const { data: trips } = useSearchSWR({
    ...searchParams,
  });

  if (trips && !trips.length) {
    const { from, to, departureDate, returnDate } = searchParams;
    let fromName: string | undefined;
    let toName: string | undefined;
    const fromDate = departureDate.toDateString();
    const toDate = returnDate?.toDateString();

    const isAirportId = (data: object): data is { airportId: string } => {
      return Reflect.has(data, 'airportId');
    };
    if (isAirportId(from)) {
      fromName = locationAutocompleteOptions.find(
        (option) => option.id === parseInt(from.airportId, 10),
      )?.name;
    } else {
      fromName = locationAutocompleteOptions.find(
        (option) => option.id === parseInt(from.locationId, 10),
      )?.name;
    }
    if (isAirportId(to)) {
      toName = locationAutocompleteOptions.find(
        (option) => option.id === parseInt(to.airportId, 10),
      )?.name;
    } else {
      toName = locationAutocompleteOptions.find(
        (option) => option.id === parseInt(to.locationId, 10),
      )?.name;
    }

    return (
      <Alert severity="info">
        No trips found for &quot;{fromName}&quot; to &quot;{toName}&quot; from &quot;{fromDate}
        &quot; to &quot;{toDate}&quot;
      </Alert>
    );
  }

  return (
    <Stack width="100%" gap={2}>
      {trips && trips.length
        ? trips.map((trip) => <SearchResult key={trip.id} trip={trip} />)
        : Array.from({ length: 10 }).map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <SearchResult key={`searchResultSkeleton-${i}`} />
          ))}
    </Stack>
  );
}
