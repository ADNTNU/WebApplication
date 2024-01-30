import { Button, Container, Typography } from "@mui/material";

export default function Search() {
  return (
    <Container 
      maxWidth="lg"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
      }}
    >
      <Typography variant="h1" component="h1" gutterBottom>
        Search
      </Typography>
      <Typography>
        This is an example project using Next.js with Material-UI.
      </Typography>
      <Button variant="contained" href="/">
        Go to Home
      </Button>
    </Container>
  );
}