import { Box, Skeleton, Typography } from '@mui/material';

type LocationCardProps = {
  title?: string;
  image?: string;
  subtitle?: string;
};

export default function LocationCard(props: LocationCardProps) {
  const { title, image, subtitle } = props;
  return title && image ? (
    <Box
      component="img"
      sx={{
        borderRadius: 2,
        position: 'relative',
        height: '100%',
        width: '100%',
      }}
      src={image}
    >
      <Box
        sx={{
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)',
          height: '100%',
          width: '100%',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            padding: 2,
            color: 'white',
          }}
        >
          <Typography variant="h5">{title}</Typography>
          {subtitle ? <Typography variant="body1">{subtitle}</Typography> : null}
        </Box>
      </Box>
    </Box>
  ) : (
    <Skeleton
      variant="rectangular"
      sx={{
        borderRadius: 2,
        width: '100%',
        height: '100%',
      }}
    />
  );
}
