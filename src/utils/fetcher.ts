import { ScopedMutator } from 'swr/_internal';

type FetcherProps = RequestInit & {
  url: RequestInfo | URL;
};

type FetcherError = {
  message: string;
  info?: any;
  status?: number;
};

export type FetcherSWRReturn<T> = {
  data: T;
  error: FetcherError;
  isValidating: boolean;
  isLoading: boolean;
  mutate: ScopedMutator;
};

export default async function fetcher<T>(props: FetcherProps): Promise<T> {
  const { url, ...rest } = props;
  const res = await fetch(url, rest);

  if (!res.ok) {
    const error: FetcherError = { message: 'An error occurred while fetching the data.' };
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
}
