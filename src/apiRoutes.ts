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
  controlPanel: {
    baseUrls: {
      user: `${baseApiUrl}/users`,
      location: `${baseApiUrl}/location`,
      trip: `${baseApiUrl}/trip`,
    },
    paginated: {
      user: ({ limit, page }: PaginationProps) =>
        `${apiRoutes.controlPanel.baseUrls.user}?l=${limit}&p=${page}`,
      location: ({ limit, page }: PaginationProps) =>
        `${apiRoutes.controlPanel.baseUrls.location}?l=${limit}&p=${page}`,
    },
  },
};
