export type PaginationProps = {
  page: number;
};

export type LimitProps = {
  limit: number;
};

const baseApiUrl = process.env.NEXT_PUBLIC_API_BASEURL;

export const apiRoutes = {
  popularDestinations: ({ limit, from }: LimitProps & { from?: string }) =>
    `${baseApiUrl}/destinaions/popular?l=${limit}${from ? `&from=${from}` : ''}`,
};
