'use server';

import { apiRoutes } from '@/apiRoutes';
import { DeleteLocation, Location, PostLocation, PutLocation } from '@models/DTO/Location';

type PostLocationProps = {
  token: string;
  data: PostLocation;
};

type PutLocationProps = {
  token: string;
  data: PutLocation;
};

type DeleteLocationProps = {
  token: string;
  data: DeleteLocation;
};

export default async function postLocation(params: PostLocationProps) {
  const { token, data } = params;
  const res = await fetch(apiRoutes.controlPanel.baseUrls.location, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error('Failed to post location.');
  }

  // TODO: Decide whether or not to do something with the response
  console.log('Sweet');
}

export async function putLocation(params: PutLocationProps) {
  const { token, data } = params;
  const res = await fetch(apiRoutes.controlPanel.baseUrls.location + `/${data.id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error('Failed to put location.');
  }

  // TODO: Decide whether or not to do something with the response
  console.log('Sweet');
}

export async function deleteLocation(params: DeleteLocationProps) {
  const { token, data } = params;
  const res = await fetch(apiRoutes.controlPanel.baseUrls.location + `/${data.id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error('Failed to put location.');
  }

  // TODO: Decide whether or not to do something with the response
  console.log('Sweet');
}
