import { Typography } from '@mui/material';
import { Stack } from '@mui/system';

type ErrorCardProps = {
  title: string;
  description: string;
};

export default function ErrorCard(props: ErrorCardProps) {
  const { title, description } = props;
  return (
    <Stack direction="column">
      <Typography variant="h3">{title}</Typography>
      <Typography>{description}</Typography>
    </Stack>
  );
}
