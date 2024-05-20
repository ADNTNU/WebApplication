'use client';

import { PaginationProps, SearchProps, apiRoutes } from '@/apiRoutes';
import { SearchResult } from '@models/DTO/SearchResult';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';

type UseSearchProps = PaginationProps & SearchProps;

export default function useSearchSWR(props: UseSearchProps) {
  const { limit, page, from, to, departureDate, returnDate } = props;

  const { data, error, isLoading, isValidating, mutate } = useSWR<SearchResult[]>(
    `${apiRoutes.search({ limit, page, departureDate, returnDate, from, to })}`,
    (url: string) => fetcher<SearchResult[]>({ url, noDataReturn: [] }),
  );

  return {
    data,
    isLoading,
    error,
    isValidating,
    mutate,
  };
}
