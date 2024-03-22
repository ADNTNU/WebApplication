// As documented in https://next-intl-docs.vercel.app/docs/environments/error-files#catching-unknown-routes
import { Locale } from '@/i18n';
import { unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

export default function CatchAllPage({ params: { locale } }: { params: { locale: Locale } }) {
  unstable_setRequestLocale(locale);
  notFound();
}
