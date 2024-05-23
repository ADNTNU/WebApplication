import { PaginationProps, SearchProps } from '@/apiRoutes';
import { SearchQuery } from '@models/Search';
import { Alert } from '@mui/material';
import { LocationOrAirportOption } from '@models/DTO/LocationOrAirport';
import SearchResults from './SearchResults';

function InvalidSearchQueryError({ message }: { message: string }) {
  return <Alert severity="error">{message}</Alert>;
}

type SearchResultsQueryParserProps = {
  locationAutocompleteOptions: LocationOrAirportOption[];
};

export default function SearchResultsQueryParser(
  props: SearchQuery & SearchResultsQueryParserProps,
) {
  const { fa, fd, fl, l, p, ta, td, tl, locationAutocompleteOptions } = props;
  let from: SearchProps['from'] | undefined;
  let to: SearchProps['to'] | undefined;
  let departureDate: SearchProps['departureDate'] | undefined;
  let returnDate: SearchProps['returnDate'] | undefined;
  let limit: PaginationProps['limit'] | undefined;
  let page: PaginationProps['page'] | undefined;
  let searchParams: (PaginationProps & SearchProps) | undefined;

  try {
    if (fa || fl) {
      from = fa ? { airportId: fa } : { locationId: fl as string };
    }
    if (ta || tl) {
      to = ta ? { airportId: ta } : { locationId: tl as string };
    }
    if (fd) {
      departureDate = new Date(parseInt(fd, 10) * 1000);
    }
    if (td) {
      returnDate = new Date(parseInt(td, 10) * 1000);
    }
    if (l) {
      limit = parseInt(l, 10);
    }
    if (p) {
      page = parseInt(p, 10);
    }
  } catch (e) {
    console.error(e);
    return <InvalidSearchQueryError message="Invalid search query. Please try again" />;
  }

  if (from && to && departureDate) {
    searchParams = {
      from,
      to,
      departureDate,
      returnDate,
      limit: limit || 10,
      page: page || 0,
    };
  } else {
    console.error(
      `Invalid search query. from: ${from}, to: ${to}, departureDate: ${departureDate}`,
    );
    return <InvalidSearchQueryError message="Invalid search query. Please try again" />;
  }

  return (
    <SearchResults locationAutocompleteOptions={locationAutocompleteOptions} {...searchParams} />
  );
}
