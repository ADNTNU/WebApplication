'use client';

import { apiRoutes } from '@/apiRoutes';
import { PopularDestination } from '@models/DTO/Location';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';

type UsePopularDestinationsProps = {
  limit: number;
  from?: string;
};

export default function usePopularDestinationsSWR({ limit, from }: UsePopularDestinationsProps) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<PopularDestination[]>(
    `${apiRoutes.popularDestinations({ limit, from })}`,
    (url: string) => fetcher<PopularDestination[]>({ url, noDataReturn: [] }),
  );

  return {
    data,
    isLoading,
    error,
    isValidating,
    mutate,
  };
}
