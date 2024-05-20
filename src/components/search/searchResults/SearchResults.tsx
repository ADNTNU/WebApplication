'use client';

import { Stack } from '@mui/material';
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

  return (
    <Stack width="100%" gap={2}>
      {trips && trips.length
        ? trips.map((trip) => <SearchResult key={trip.id} trip={trip} />)
        : Array.from({ length: 10 }).map(() => <SearchResult key="searchResultSkeleton" />)}
    </Stack>
  );
}
