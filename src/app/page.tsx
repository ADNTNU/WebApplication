import { Button, Container, Link, Typography } from "@mui/material";

export default function Landing() {
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
        Next.js with Material-UI
      </Typography>
      <Typography>
        This is an example project using Next.js with Material-UI.
      </Typography>
      <Button variant="contained" href="/search">
        Go to Search
      </Button>
    </Container>
  );
}