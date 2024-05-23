import { Airport } from '@models/Airport';
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import capitalizeFirstLetter from '@utils/capitalizeFirstLetter';
import { useTranslations } from 'next-intl';

type TripOverviewProps = {
  departureAirport: Airport;
  arrivalAirport: Airport;
  roundTrip?: boolean;
  localizedInAirDuration?: string;
  localizedLayoverDuration?: string;
  localizedTotalDuration?: string;
};

export default function TripOverview(props: TripOverviewProps) {
  const {
    departureAirport,
    arrivalAirport,
    roundTrip,
    localizedInAirDuration,
    localizedLayoverDuration,
    localizedTotalDuration,
  } = props;
  const aT = useTranslations('common.airport');
  const t = useTranslations('common.trip');
  const cT = useTranslations('common');

  return (
    <TableContainer component={Paper}>
      <Table /* sx={{ minWidth: 650 }} */ aria-label="Trip overview table">
        {/* <TableHead>
    <TableRow>
      <TableCell>Dessert (100g serving)</TableCell>
      <TableCell align="right">Fat&nbsp;(g)</TableCell>
      <TableCell align="right">Calories</TableCell>
    </TableRow>
  </TableHead> */}
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
              {capitalizeFirstLetter(aT('departureAirport'))}
            </TableCell>
            <TableCell align="right">
              {departureAirport.name} ({departureAirport.code})
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              {capitalizeFirstLetter(aT('arrivalAirport'))}
            </TableCell>
            <TableCell align="right">
              {arrivalAirport.name} ({arrivalAirport.code})
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              {capitalizeFirstLetter(t('type'))}
            </TableCell>
            <TableCell align="right">
              {capitalizeFirstLetter(roundTrip ? t('roundTrip') : t('oneWay'))}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              {capitalizeFirstLetter(t('inAirDuration'))}
            </TableCell>
            <TableCell align="right">
              {capitalizeFirstLetter(localizedInAirDuration || cT('none'))}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              {capitalizeFirstLetter(t('layoverDuration'))}
            </TableCell>
            <TableCell align="right">
              {capitalizeFirstLetter(localizedLayoverDuration || cT('none'))}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              {capitalizeFirstLetter(t('totalDuration'))}
            </TableCell>
            <TableCell align="right">
              {capitalizeFirstLetter(localizedTotalDuration || cT('none'))}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
