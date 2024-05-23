'use server';

import { apiRoutes } from '@/apiRoutes';

export default async function postSaved(token: string, tripId: number) {
  const data = { tripId };
  const res = await fetch(apiRoutes.saved, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error('Failed to post location.');
  }
}
