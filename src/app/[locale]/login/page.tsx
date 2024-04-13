import PageSection from '@/components/layout/PageSection';
import PageWrapper from '@/components/layout/PageWrapper';
import LoginMenu from '@/components/login/LoginMenu';
import { Locale } from '@/i18n';

export default function Login({ params: { locale } }: { params: { locale: Locale } }) {
  return (
    <PageWrapper locale={locale}>
      <PageSection sx={{ mt: 2 }}>
        <LoginMenu />
      </PageSection>
    </PageWrapper>
  );
}
