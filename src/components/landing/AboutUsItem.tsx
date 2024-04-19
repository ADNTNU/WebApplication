import Link from '@components/navigation/Link';
import { SafeHref } from '@internationalization/navigation';
import { Box, Paper, Stack, Typography } from '@mui/material';

export type AboutUsItemProps = {
  title: string;
  description: string;
  image: string;
  direction: 'left' | 'right';
  links?: { title: string; href: SafeHref }[];
};

export default function AboutUsItem(props: AboutUsItemProps) {
  const { title, description, image, direction, links } = props;
  return (
    // <Paper sx={{ borderRadius: 2 }} elevation={2}>
    <Stack
      sx={{
        flexDirection: { xs: 'column', md: direction === 'left' ? 'row' : 'row-reverse' },
        // p: 2,
        width: '100%',
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <Box component="img" src={image} alt={title} sx={{ width: { xs: '100%', md: '50%' } }} />
      <Paper sx={{ p: 2, width: { xs: '100%', md: '50%' } }}>
        <Stack sx={{ width: '100%', height: '100%' }}>
          <Typography variant="h4">{title}</Typography>
          <Typography>{description}</Typography>
          {links && (
            // Place the stack at the end of the parent stack
            <Stack direction="row" gap={2} sx={{ mt: 'auto' }}>
              {links.map((link) => (
                <Link key={link.title} href={link.href}>
                  {link.title}
                </Link>
              ))}
            </Stack>
          )}
        </Stack>
      </Paper>
    </Stack>
    // </Paper>
  );
}
