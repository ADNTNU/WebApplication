import { Paper, Typography } from '@mui/material';

export default function SearchHero() {
  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'background.paper',
        padding: '2rem',
      }}
    >
      <Typography variant="h2" component="h1">
        Will be replaced with a search hero
      </Typography>
    </Paper>
  );
}
