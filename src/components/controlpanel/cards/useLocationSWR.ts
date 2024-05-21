'use client';

import { PaginationProps, apiRoutes } from '@/apiRoutes';
import { Location } from '@/models/DTO/Location';
import fetcher from '@/utils/fetcher';
import useSWR from 'swr';

export default function useLocationSWR({ limit, page }: PaginationProps) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<Location[]>(
    `${apiRoutes.controlPanel.paginated.location({ limit, page })}`,
    (url: string) => fetcher<Location[]>({ url }),
  );

  return {
    data,
    isLoading,
    error,
    isValidating,
    mutate,
  };
}
