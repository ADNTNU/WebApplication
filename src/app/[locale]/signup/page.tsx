import PageSection from '@/components/layout/main/PageSection';
import PageWrapper from '@/components/layout/main/PageWrapper';
import SignupMenu from '@components/signup/SignupMenu';
import { Locale } from '@/internationalization/i18n';

export default function Signup({ params: { locale } }: { params: { locale: Locale } }) {
  return (
    <PageWrapper>
      <PageSection sx={{ mt: 2 }}>
        <SignupMenu />
      </PageSection>
    </PageWrapper>
  );
}
