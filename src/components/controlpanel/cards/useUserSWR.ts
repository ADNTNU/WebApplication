'use client';

import { PaginationProps, apiRoutes } from '@/apiRoutes';
import { User } from '@/models/DTO/User';
import fetcher from '@/utils/fetcher';
import useSWR from 'swr';

export default function useUserSWR({ limit, page }: PaginationProps) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<User[]>(
    `${apiRoutes.controlPanel.paginated.user({ limit, page })}`,
    (url: string) => fetcher<User[]>({ url }),
  );

  return {
    data,
    isLoading,
    error,
    isValidating,
    mutate,
  };
}
