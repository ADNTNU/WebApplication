'use client';
import { Container, Stack, styled } from '@mui/material';

export const FooterContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  minHeight: 80,
  width: '100%',
  padding: 20,
  rowGap: 10,
  backgroundColor: theme.palette.background.default,
  maxWidth: 'lg',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
}));

export const FooterSection = styled(Stack)(({ theme }) => ({
  columnGap: 20,
  rowGap: 10,
  textAlign: 'left',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    width: '100%',
  },
}));
