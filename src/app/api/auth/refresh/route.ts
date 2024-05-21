/* eslint-disable import/prefer-default-export */
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const body = await request.json();

  const prefix = process.env.NODE_ENV === 'development' ? 'Dev-' : '';

  const payload = {
    refreshToken: cookies().get(`${prefix}FlightFinder.refresh-token`)?.value,
    userID: body.userID,
  };

  // TODO: Link to API refresh endpoint
  const res = await fetch(`${process.env.API_BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  return Response.json({
    success: res.ok,
    status: res.status,
    data,
  });
}
