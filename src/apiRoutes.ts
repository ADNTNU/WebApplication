export type LimitProps = {
  limit: number;
};

export type PaginationProps = LimitProps & {
  page: number;
};

export type Destination =
  | {
      airportId: string;
    }
  | {
      locationId: string;
    };

export type SearchProps = {
  from: Destination;
  to: Destination;
  departureDate: Date;
  returnDate?: Date;
};

const baseApiUrl = process.env.NEXT_PUBLIC_API_BASEURL;

function searchFunction(props: PaginationProps & SearchProps) {
  const { limit, page, from, to, departureDate, returnDate } = props;
  const isAirportId = (data: object): data is { airportId: string } => {
    return Reflect.has(data, 'airportId');
  };

  const fromDateUnixString = Math.floor(departureDate.getTime() / 1000).toString();
  const toDateUnixString = returnDate
    ? Math.floor(returnDate.getTime() / 1000).toString()
    : undefined;

  let fromAirportId: string | undefined;
  let fromLocationId: string | undefined;

  let toAirportId: string | undefined;
  let toLocationId: string | undefined;

  if (!isAirportId(from)) {
    fromLocationId = from.locationId;
  } else {
    fromAirportId = from.airportId;
  }

  if (!isAirportId(to)) {
    toLocationId = to.locationId;
  } else {
    toAirportId = to.airportId;
  }

  return `${baseApiUrl}/search?l=${limit}&p=${page}${fromAirportId ? `&fromAirportId=${fromAirportId}` : ''}${fromLocationId ? `&fromLocationId=${fromLocationId}` : ''}${toAirportId ? `&toAirportId=${toAirportId}` : ''}${toLocationId ? `&toLocationId=${toLocationId}` : ''}&departureDate=${fromDateUnixString}${toDateUnixString ? `&returnDate=${toDateUnixString}` : ''}`;
}

export const apiRoutes = {
  popularDestinations: ({ limit, from }: LimitProps & { from?: string }) =>
    `${baseApiUrl}/location/popularDestinations?l=${limit}${from ? `&from=${from}` : ''}`,
  search: searchFunction,
  locationAutocomplete: `${baseApiUrl}/search/autocomplete-locations`,
  trip: (tripId: string) => `${baseApiUrl}/trip/${tripId}`,
  saved: `${baseApiUrl}/saved`,
};
