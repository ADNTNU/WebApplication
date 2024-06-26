import { ScopedMutator } from 'swr/_internal';

type FetcherProps = RequestInit & {
  url: RequestInfo | URL;
  noDataReturn?: unknown;
  token?: string;
};

class FetcherError extends Error {
  info: unknown;

  status: number | undefined;

  constructor(message: string, info?: unknown, status?: number) {
    super(message);
    this.info = info;
    this.status = status;
  }
}

export type FetcherSWRReturn<T> = {
  data: T;
  error: FetcherError;
  isValidating: boolean;
  isLoading: boolean;
  mutate: ScopedMutator;
};

export default async function fetcher<T>(props: FetcherProps): Promise<T> {
  const { url, noDataReturn, token, ...rest } = props;

  const options = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer: ${token}` }),
    },
    ...rest,
  };
  const res = await fetch(url, options);

  if (!res.ok) {
    if (noDataReturn) {
      return noDataReturn as T;
    }
    throw new FetcherError(
      'An error occurred while fetching the data',
      await res.json(),
      res.status,
    );
  }

  return res.json();
}
