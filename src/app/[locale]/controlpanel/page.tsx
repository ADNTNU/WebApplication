import React from 'react';
import PageWrapper from '@components/layout/main/PageWrapper';
import PageSection from '@components/layout/main/PageSection';
import ControlPanel from '@components/controlpanel/ControlPanel';

export default function page() {
  return (
    <PageWrapper>
      <PageSection sx={{ py: 2 }}>
        <ControlPanel />
      </PageSection>
    </PageWrapper>
  );
}
