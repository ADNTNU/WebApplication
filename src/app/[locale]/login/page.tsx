import PageSection from '@components/layout/main/PageSection';
import PageWrapper from '@/components/layout/main/PageWrapper';
import LoginMenu from '@/components/login/LoginMenu';
import { Locale } from '@/internationalization/i18n';

export default function Login({ params: { locale } }: { params: { locale: Locale } }) {
  return (
    <PageWrapper>
      <PageSection sx={{ mt: 2 }}>
        <LoginMenu />
      </PageSection>
    </PageWrapper>
  );
}
