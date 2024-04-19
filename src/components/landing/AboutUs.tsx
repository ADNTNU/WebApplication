import { Stack } from '@mui/material';
import missionImage from '@images/mission.jpg';
import visionImage from '@images/vision.jpg';
import AboutUsItem, { AboutUsItemProps } from './AboutUsItem';

const aboutUsItems: AboutUsItemProps[] = [
  {
    title: 'Our Mission',
    description: 'Our mission is to provide the best flight booking experience for our customers.',
    image: { src: missionImage, alt: 'Mission' },
    // imageSources: [
    //   { src: '/images/mission-400px.jpg', media: '(max-width: 1200px)' },
    //   { src: '/images/mission-600px.jpg', media: '(max-width: 1600px)' },
    // ],
    direction: 'left',
  },
  {
    title: 'Our Vision',
    description: 'Our vision is to be the best flight booking platform in the world.',
    image: { src: visionImage, alt: 'Vision' },
    // imageSources: [
    //   { src: '/images/vision-400px.jpg', media: '(max-width: 1200px)' },
    //   { src: '/images/vision-600px.jpg', media: '(max-width: 1600px)' },
    // ],
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
