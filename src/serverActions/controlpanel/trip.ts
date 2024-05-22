'use server';
import { apiRoutes } from '@/apiRoutes';
import { TripActive } from '@models/DTO/TripActive';

type PostTripProps = {
  token: string;
  data: TripActive;
};

export default async function putTrip(params: PostTripProps) {
  const { token, data } = params;
  if (!data.id || !data.active) {
    throw new Error('Id or active is invalid');
  }
  const res = await fetch(
    apiRoutes.controlPanel.baseUrls.trip + `/${data.id}/active?active=${data.active}`,
    {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  if (!res.ok) {
    throw new Error('Failed to post Trip.');
  }

  // TODO: Decide whether or not to do something with the response
  console.log('Sweet');
}
