import React from 'react';
import { ControlpanelTypes } from '@/constants/ControlpanelContext';
import user from '@components/controlpanel/cards/user';
import trip from '@components/controlpanel/cards/trip';
import airport from '@components/controlpanel/cards/airPort';
import airline from '@components/controlpanel/cards/airLine';
import priceAndProviders from '@components/controlpanel/cards/priceAndProviders';
import flight from '@components/controlpanel/cards/flight';

interface Props {
  type: (typeof ControlpanelTypes)[keyof typeof ControlpanelTypes];
}

const controls = ({ type }: Props) => {
  let Component;

  switch (type) {
    case ControlpanelTypes.USER:
      Component = user;
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

    case ControlpanelTypes.PRICESANDPROVIDERS:
      Component = priceAndProviders;
      break;

    default:
      Component = user;
  }

  return (
    <div>
      <Component />
    </div>
  );
};

export default controls;
