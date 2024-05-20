'use client';

import { Alert, Stack } from '@mui/material';
// import useSearchFilterContext from '@hooks/context/useSearchFilterContext';
import { PaginationProps, SearchProps } from '@/apiRoutes';
import SearchResult from './SearchResult';
import useSearchSWR from './useSearchSWR';

type SearchResultsProps = PaginationProps & SearchProps;

export default function SearchResults(props: SearchResultsProps) {
  const { ...searchParams } = props;

  // const { filters } = useSearchFilterContext();

  const { data: trips } = useSearchSWR({
    ...searchParams,
  });

  if (trips && !trips.length) {
    return <Alert severity="info">No trips found. Try another search</Alert>;
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
