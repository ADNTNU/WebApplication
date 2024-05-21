const controlpanelPages = {
  USER: 'User',
  TRIP: 'Trip',
  AIRLINE: 'Airline',
  AIRPORT: 'Airport',
  LOCATION: 'Location',
  FLIGHT: 'Flight',
  PRICESANDPROVIDERS: 'PricesAndProviders',
  CLASS: 'Class',
  FEATURES: 'Features',
} as const;

export type ControlpanelPage = (typeof controlpanelPages)[keyof typeof controlpanelPages];

export default controlpanelPages;
