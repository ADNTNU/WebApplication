import React from 'react';
import { ControlpanelTypes } from '@/constants/ControlpanelContext';
import user from '@components/controlpanel/cards/user';
import trip from '@components/controlpanel/cards/trip';
import airport from '@components/controlpanel/cards/airPort';
import airline from '@components/controlpanel/cards/airLine';
import priceAndProviders from '@components/controlpanel/cards/priceAndProviders';
import flight from '@components/controlpanel/cards/flight';
import location from '@components/controlpanel/cards/location';
import { Box } from '@mui/material';

interface Props {
  type: (typeof ControlpanelTypes)[keyof typeof ControlpanelTypes];
  token?: string;
}

const controls = ({ type, token }: Props) => {
  let Component: React.ReactNode | undefined;

  switch (type) {
    case ControlpanelTypes.USER:
      Component = <user token={token} />;
      break;
    case ControlpanelTypes.TRIP:
      Component = trip;
      break;

    case ControlpanelTypes.AIRPORT:
      Component = airport;
      break;
    case ControlpanelTypes.AIRLINE:
      Component = airline;
      break;
    case ControlpanelTypes.FLIGHT:
      Component = flight;
      break;
    case ControlpanelTypes.LOCATION:
      Component = location;
      break;

    case ControlpanelTypes.PRICESANDPROVIDERS:
      Component = priceAndProviders;
      break;

    default:
      Component = user;
  }

  return <Box>{Component}</Box>;
};

export default controls;
