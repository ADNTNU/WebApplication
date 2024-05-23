'use client';

import { apiRoutes } from '@/apiRoutes';
import { Trip } from '@models/Trip';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';

type UseSavedTripByTripIdProps = {
  token?: string;
  tripId: number;
};

export default function useSavedTripByTripIdSWR(props: UseSavedTripByTripIdProps) {
  const { token, tripId } = props;
  const { data, error, isLoading, isValidating, mutate } = useSWR<Trip[]>(
    token ? `${apiRoutes.saved}/${tripId}` : null,
    (url: string) =>
      fetcher<Trip[]>({
        url,
        noDataReturn: [],
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
  );

  return {
    data,
    isLoading,
    error,
    isValidating,
    mutate,
  };
}
