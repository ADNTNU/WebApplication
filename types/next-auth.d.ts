/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  // TODO: Add wanted properties to next-auth types
  interface User {
    id: string;
    email: string;
    cognitoGroups: string[];
    accessToken: string;
    refreshToken: string;
    idToken: string;
    exp: number;
    role: string;
  }

  interface Session {
    user: DefaultSession['user'] & User;
    expires: string;
    error: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    // idToken?: string;
  }
}
