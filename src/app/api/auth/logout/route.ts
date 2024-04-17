/* eslint-disable import/prefer-default-export */
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const body = await request.json();

  // change with your own endpoint
  const res = await fetch(`${process.env.API_BASE_URL}/auth/logout`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${body.accessToken}`,
    },
  });

  const prefix = process.env.NODE_ENV === 'development' ? 'Dev-' : '';
  // remove cookies after
  await Promise.all(
    cookies()
      .getAll()
      .map(async (cookie) => {
        if (cookie.name.startsWith(`${prefix}xxx.`)) {
          return cookies().delete(cookie.name);
        }
        return null;
      }),
  );

  return Response.json({
    success: res.ok,
    status: res.status,
  });
}
