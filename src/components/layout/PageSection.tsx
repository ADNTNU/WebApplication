import { Container, SxProps } from '@mui/material';
import { ComponentProps, ElementType, ReactNode } from 'react';

type PageSectionProps = {
  children: ReactNode;
  component?: ElementType;
  maxWidth?: ComponentProps<typeof Container>['maxWidth'];
  sx?: SxProps;
  paddingY?: boolean;
  noPaddingX?: boolean;
};

export default function PageSection({
  children,
  component = 'section',
  maxWidth = 'lg',
  sx,
  paddingY = false,
  noPaddingX = false,
}: PageSectionProps) {
  const sxWithDefaults = {
    paddingY: paddingY ? 4 : undefined,
    paddingX: noPaddingX ? 0 : undefined,
    ...sx,
  };

  return (
    <Container component={component} sx={sxWithDefaults} maxWidth={maxWidth}>
      {children}
    </Container>
  );
}
