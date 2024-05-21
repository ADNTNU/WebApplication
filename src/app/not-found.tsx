'use client';

import Error from 'next/error';

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <Error statusCode={404} title="This page could not be found" />
      </body>
    </html>
  );
}
