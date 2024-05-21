'use server';

import { apiRoutes } from '@/apiRoutes';
import { Location } from '@models/DTO/Location';

type PostLocationProps = {
  token: string;
  data: Location;
};

export default async function postLocation(params: PostLocationProps) {
  const { token, data } = params;
  const res = await fetch(apiRoutes.location, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error('Failed to post location.');
  }
  console.log('Sweet');
}
