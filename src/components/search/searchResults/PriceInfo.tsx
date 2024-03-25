import { Button, Skeleton, Stack, Typography } from '@mui/material';

type PriceInfoProps = {
  price?: number;
  currency?: string;
};

export default function PriceInfo(props: PriceInfoProps) {
  const { price, currency } = props;

  const priceFontSize = '1.5rem';

  if (!price || !currency) {
    return (
      <Stack width="100px" gap={2} alignItems="center" marginY="auto">
        <Skeleton width="60%" variant="text" sx={{ fontSize: priceFontSize }} />
        <Skeleton width="100%" height="24px" variant="rectangular" />
      </Stack>
    );
  }

  return (
    <Stack flexGrow={0} gap={2} marginY="auto">
      <Typography fontWeight="bold" fontSize={priceFontSize} textAlign="right">
        {price} {currency}
      </Typography>
      <Button variant="contained" color="primary">
        Book
      </Button>
    </Stack>
  );
}
