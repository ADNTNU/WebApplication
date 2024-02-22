// As documented in https://next-intl-docs.vercel.app/docs/environments/error-files#catching-unknown-routes
import { notFound } from 'next/navigation';

export default function CatchAllPage() {
  notFound();
}
