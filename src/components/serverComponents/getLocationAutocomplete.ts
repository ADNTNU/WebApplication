import { apiRoutes } from '@/apiRoutes';
import { LocationOrAirportOption } from '@models/DTO/LocationOrAirport';

export default async function getLocationAutocompleteOptions() {
  try {
    const res = await fetch(apiRoutes.locationAutocomplete);
    if (!res.ok) {
      return [];
    }
    const data = await res.json();
    return data as LocationOrAirportOption[];
  } catch (e) {
    return [];
  }
}
