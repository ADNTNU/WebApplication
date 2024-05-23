/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { DefaultSession } from 'next-auth';

type Role = 'ROLE_ADMIN' | 'ROLE_USER';

declare module 'next-auth' {
  // TODO: Add wanted properties to next-auth types
  interface User {
    jwt: string;
    email: string;
    roles: Role[];
    iat: number;
    exp: number;
  }

  interface Session {
    user: DefaultSession['user'] & User;
    expires: string;
    error: string;
    token: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: DefaultSession['user'] & User;
    token: string;
  }
}
