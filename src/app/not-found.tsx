'use client';

import NotFoundComponent from '@components/NotFound';

export default function NotFound() {
  const description = 'The page you are looking for does not exist.';
  const goBackToLastPage = 'Go back to the last page';
  const goToHomePage = 'Go to the home page';
  return (
    <html lang="en">
      <body>
        <NotFoundComponent
          description={description}
          goBackToLastPage={goBackToLastPage}
          goToHomePage={goToHomePage}
          hasLocale={false}
        />
      </body>
    </html>
  );
}
