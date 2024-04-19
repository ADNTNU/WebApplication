import { Stack } from '@mui/material';
import AboutUsItem, { AboutUsItemProps } from './AboutUsItem';

const aboutUsItems: AboutUsItemProps[] = [
  {
    title: 'Our Mission',
    description: 'Our mission is to provide the best flight booking experience for our customers.',
    image: '/images/mission.jpg',
    direction: 'left',
  },
  {
    title: 'Our Vision',
    description: 'Our vision is to be the best flight booking platform in the world.',
    image: '/images/vision.jpg',
    direction: 'right',
    links: [{ title: 'Learn More', href: '/about' }],
  },
];

export default function AboutUs() {
  return (
    // <Paper sx={{ p: 2 }}>
    <Stack gap={2}>
      {aboutUsItems.map((item) => (
        <AboutUsItem key={item.title} {...item} />
      ))}
    </Stack>
    // </Paper>
  );
}
