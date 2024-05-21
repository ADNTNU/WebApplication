import PageSection from '@/components/layout/main/PageSection';
import PageWrapper from '@/components/layout/main/PageWrapper';
import SignupMenu from '@components/signup/SignupMenu';
import { Locale } from '@/internationalization/i18n';
import { unstable_setRequestLocale } from 'next-intl/server';

export default function Signup({ params: { locale } }: { params: { locale: Locale } }) {
  unstable_setRequestLocale(locale);
  return (
    <PageWrapper>
      <PageSection sx={{ mt: 2 }}>
        <SignupMenu />
      </PageSection>
    </PageWrapper>
  );
}
