import Link from '@components/navigation/Link';
import { SafeHref } from '@internationalization/navigation';
import { Box, Paper, Stack, Typography } from '@mui/material';
import Image, { StaticImageData } from 'next/image';

export type AboutUsItemProps = {
  title: string;
  description: string;
  image: { src: StaticImageData | string; alt: string };
  // imageSources: { src: string; media: string }[];
  direction: 'left' | 'right';
  links?: { title: string; href: SafeHref }[];
};

export default function AboutUsItem(props: AboutUsItemProps) {
  const { title, description, image, /* imageSources, */ direction, links } = props;
  return (
    <Stack
      sx={{
        flexDirection: { xs: 'column', md: direction === 'left' ? 'row' : 'row-reverse' },
        // p: 2,
        width: '100%',
        borderRadius: 2,
        overflow: 'hidden',
      }}
      component={Paper}
      elevation={3}
    >
      <Box sx={{ width: { xs: '100%', md: '50%' }, position: 'relative' }} height={400}>
        {/* Cover  */}
        <Image
          src={image.src}
          alt={image.alt}
          sizes="(max-width: 900px) 100vw, 600px"
          fill
          style={{ objectFit: 'cover' }}
          placeholder="blur"
        />
      </Box>
      <Paper sx={{ p: 2, width: { xs: '100%', md: '50%' }, borderRadius: 0 }}>
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
