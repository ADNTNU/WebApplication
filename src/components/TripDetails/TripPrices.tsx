import ButtonLink from '@components/navigation/ButtonLink';
import { Price } from '@models/Price';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import capitalizeFirstLetter from '@utils/capitalizeFirstLetter';
import { useTranslations } from 'next-intl';

type TripPricesProps = {
  prices: Price[];
};

export default function TripPrices(props: TripPricesProps) {
  const { prices } = props;

  const t = useTranslations('components.trip');

  return (
    <TableContainer component={Paper}>
      <Table /* sx={{ minWidth: 650 }} */ aria-label="Price table">
        <TableHead>
          <TableRow>
            <TableCell>{capitalizeFirstLetter(t('provider'))}</TableCell>
            <TableCell align="center">{capitalizeFirstLetter(t('price'))}</TableCell>
            <TableCell align="center">{capitalizeFirstLetter(t('book'))}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {prices.map((price) => (
            <TableRow key={price.id}>
              <TableCell component="th" scope="row">
                {price.provider.name}
              </TableCell>
              <TableCell align="center">
                {price.price} ({price.currency})
              </TableCell>
              <TableCell align="center">
                <ButtonLink href="/redirect">{t('book')}</ButtonLink>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
