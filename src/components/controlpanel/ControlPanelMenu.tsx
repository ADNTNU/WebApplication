import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import FlightIcon from '@mui/icons-material/Flight';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import controlpanelPages from '@components/controlpanel/pages';

type Props = {
  onClick: (type: (typeof controlpanelPages)[keyof typeof controlpanelPages]) => void;
};

export default function ControlPanelMenu({ onClick }: Props) {
  const [countClick, setCountClick] = useState(false);
  const [countClick2, setCountClick2] = useState(false);
  const handleClick = () => {
    setCountClick(!countClick);
  };
  const handleClick2 = () => {
    setCountClick2(!countClick2);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 240, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Users and Trip settings
        </ListSubheader>
      }
    >
      <ListItemButton onClick={() => onClick(controlpanelPages.USER)}>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItemButton>
      <ListItemButton onClick={() => onClick(controlpanelPages.TRIP)}>
        <ListItemIcon>
          <CardTravelIcon />
        </ListItemIcon>
        <ListItemText primary="Trips" />
      </ListItemButton>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <FlightIcon />
        </ListItemIcon>
        <ListItemText primary="Fligths" />
        {countClick ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={countClick} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={() => onClick(controlpanelPages.AIRLINE)}>
            <ListItemText primary="Airline" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => onClick(controlpanelPages.AIRPORT)}>
            <ListItemText primary="Airport" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => onClick(controlpanelPages.LOCATION)}>
            <ListItemText primary="Location" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => onClick(controlpanelPages.FLIGHT)}>
            <ListItemText primary="Flight" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={handleClick2}>
        <ListItemIcon>
          <AirlineSeatReclineNormalIcon />
        </ListItemIcon>
        <ListItemText primary="Extra" />
        {countClick2 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={countClick2} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => onClick(controlpanelPages.PRICESANDPROVIDERS)}
          >
            <ListItemText primary="Prices and Providers" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => onClick(controlpanelPages.CLASS)}>
            <ListItemText primary="Class" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => onClick(controlpanelPages.FEATURES)}>
            <ListItemText primary="Features" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}
