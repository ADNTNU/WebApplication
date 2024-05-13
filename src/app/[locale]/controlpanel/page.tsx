import React from 'react';
import PageWrapper from '@components/layout/main/PageWrapper';
import MainTest from '@/components/controlpanel/maintest';
import PageSection from '@components/layout/main/PageSection';

export default function page() {
  return (
    <PageWrapper>
      <PageSection sx={{ py: 2 }}>
        <MainTest />
      </PageSection>
    </PageWrapper>
  );
}
