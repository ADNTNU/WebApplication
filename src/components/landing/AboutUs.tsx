import { Stack } from '@mui/material';
import missionImage from '@images/mission.jpg';
import visionImage from '@images/vision.jpg';
import teamImage from '@images/team.jpg';
import { useTranslations } from 'next-intl';
import AboutUsItem, { AboutUsItemProps } from './AboutUsItem';

type AboutUsItemPropsTemplate = Omit<AboutUsItemProps, 'description' | 'title'>;

type AboutUsItems = {
  mission: AboutUsItemPropsTemplate;
  vision: AboutUsItemPropsTemplate;
  team: AboutUsItemPropsTemplate;
};

const aboutUsItems: AboutUsItems = {
  mission: {
    image: { src: missionImage, alt: 'Mission' },
    direction: 'left',
  },
  vision: {
    image: { src: visionImage, alt: 'Vision' },
    direction: 'right',
    links: [{ title: 'Learn More', href: '/about' }],
  },
  team: {
    image: { src: teamImage, alt: 'Team' },
    direction: 'left',
  },
} as const;

export default function AboutUs() {
  const t = useTranslations('components.about');
  return (
    // <Paper sx={{ p: 2 }}>
    <Stack gap={2}>
      {Object.entries(aboutUsItems).map(([key, value]) => {
        const itemKey = key as keyof AboutUsItems;
        const title = t(`${itemKey}.title`);
        const description = t(`${itemKey}.description`);
        const itemProps: AboutUsItemProps = {
          ...value,
          title,
          description,
        };
        return <AboutUsItem key={title} {...itemProps} />;
      })}
    </Stack>
    // </Paper>
  );
}
