import ButtonLink from '@components/navigation/ButtonLink';
import { Box, Skeleton, Stack, Typography } from '@mui/material';
import capitalizeFirstLetter from '@utils/capitalizeFirstLetter';
import { useTranslations } from 'next-intl';

type PriceInfoProps = {
  price?: number;
  currency?: string;
  tripId?: string;
};

export default function PriceInfo(props: PriceInfoProps) {
  const { price, currency, tripId } = props;
  const t = useTranslations('actions');

  const priceFontSize = '1.5rem';

  if (!price || !currency || !tripId) {
    return (
      <Stack width="100px" gap={2} alignItems="center" marginY="auto">
        <Skeleton width="60%" variant="text" sx={{ fontSize: priceFontSize }} />
        <Skeleton width="100%" height="24px" variant="rectangular" />
      </Stack>
    );
  }

  return (
    <Stack flexGrow={0} gap={2} marginY="auto">
      <Typography
        fontWeight="bold"
        fontSize={priceFontSize}
        sx={{ textAlign: { xs: 'left', md: 'right' } }}
      >
        {price} {currency}
      </Typography>
      <Box display="flex" sx={{ justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
        <ButtonLink
          href={{ pathname: '/trip/[tripId]', params: { tripId } }}
          variant="contained"
          color="primary"
        >
          {capitalizeFirstLetter(t('showDetails'))}
        </ButtonLink>
      </Box>
    </Stack>
  );
}
