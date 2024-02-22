const breakpoints = {
  values: {
    xs: 0,
    xsm: 350,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
    xxl: 2000,
    xxxl: 2500,
    xxxxl: 3000,
  },
};

declare module '@mui/material/styles' {
  type BreakpointOverrides = {
    xsm: true;
    xxl: true;
    xxxl: true;
    xxxxl: true;
  };
}

export default breakpoints;
