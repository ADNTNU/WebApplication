import * as React from 'react';
import ThemeProvider from '@material/themes';

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {props.children}
        </ThemeProvider>
      </body>
    </html>
  );
}