import controlpanelPages from '@components/controlpanel/pages';
import User from '@components/controlpanel/cards/user';
import Trip from '@components/controlpanel/cards/trip';
import Airport from '@components/controlpanel/cards/airPort';
import Airline from '@components/controlpanel/cards/airLine';
import PriceAndProviders from '@components/controlpanel/cards/priceAndProviders';
import Flight from '@components/controlpanel/cards/flight';
import Location from '@components/controlpanel/cards/location';
import { Box } from '@mui/material';
import { ReactNode } from 'react';
import ErrorCard from './cards/ErrorCard';

type Props = {
  type: (typeof controlpanelPages)[keyof typeof controlpanelPages];
  token?: string;
};

export default function Controls(props: Props) {
  const { type, token } = props;
  let component: ReactNode | undefined;

  if (!token) {
    return (
      <ErrorCard
        title="Error"
        description="You are not signed in. Please sign in to view this page."
      />
    );
  }

  switch (type) {
    case controlpanelPages.USER:
      component = <User token={token} />;
      break;
    case controlpanelPages.TRIP:
      component = <Trip token={token} />;
      break;

    case controlpanelPages.AIRPORT:
      component = <Airport token={token} />;
      break;
    case controlpanelPages.AIRLINE:
      component = <Airline token={token} />;
      break;
    case controlpanelPages.FLIGHT:
      component = <Flight token={token} />;
      break;
    case controlpanelPages.LOCATION:
      component = <Location token={token} />;
      break;

    case controlpanelPages.PRICESANDPROVIDERS:
      component = <PriceAndProviders token={token} />;
      break;

    default:
      component = <User token={token} />;
  }

  return <Box>{component}</Box>;
}
