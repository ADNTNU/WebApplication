export type LimitProps = {
  limit: number;
};

export type PaginationProps = LimitProps & {
  page: number;
};

const baseApiUrl = process.env.NEXT_PUBLIC_API_BASEURL;

export const apiRoutes = {
  popularDestinations: ({ limit, from }: LimitProps & { from?: string }) =>
    `${baseApiUrl}/destinaions/popular?l=${limit}${from ? `&from=${from}` : ''}`,
  user: ({ limit, page }: PaginationProps) => `${baseApiUrl}/users`,
  location: `${baseApiUrl}/location`,
};
