import React from 'react';
import { ControlpanelTypes } from '@/constants/ControlpanelContext';
import user from '@components/controlpanel/cards/user';

interface Props {
  type: (typeof ControlpanelTypes)[keyof typeof ControlpanelTypes];
}

const controls = ({ type }: Props) => {
  let Component;

  switch (type) {
    case ControlpanelTypes.USER:
      Component = user;
      break;
    case ControlpanelTypes.LOCATION:
      Component = user;
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
