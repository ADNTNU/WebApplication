import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import type { NextAuthOptions } from 'next-auth';
import { getServerSession as getServerSessionNextAuth, User } from 'next-auth';
import { DecodedJWT, parseJwt } from '@utils/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const authConfig = {
  theme: {
    logo: 'https://next-auth.js.org/img/logo/logo-sm.png',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
    signOut: '/logout',
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      id: 'signin',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'ola.nordmann@example.com',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        const payload = {
          email: credentials?.email,
          password: credentials?.password,
        };
        // console.log('Payload:', payload);
        // console.log('auth-URL:', `${process.env.NEXT_PUBLIC_API_BASEURL}/auth/login`);

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASEURL}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });

          const data = await res.json();

          if (!res.ok) {
            throw new Error(data.message);
          }

          const decodedJWT: DecodedJWT = parseJwt(data.jwt);

          const user: User = {
            jwt: data.jwt,
            id: decodedJWT.sub,
            email: decodedJWT.sub,
            roles: decodedJWT.roles.map((role) => role.authority),
            iat: decodedJWT.iat,
            exp: decodedJWT.exp,
          };

          return user;
        } catch (error) {
          console.error('Error:', error);
          return null;
        }
      },
    }),
    CredentialsProvider({
      id: 'register',
      name: 'register',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'ola.nordmann@example.com',
        },
        password: { label: 'Password', type: 'password' },
        firstName: { label: 'First Name', type: 'text' },
        lastName: { label: 'Last Name', type: 'text' },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASEURL}/auth/signup`, {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { 'Content-Type': 'application/json' },
          });

          const data = await res.json();

          if (res.status !== 200 && res.status !== 201) {
            throw new Error('User already exists');
          }
          const decodedJWT: DecodedJWT = parseJwt(data.jwt);

          const user: User = {
            jwt: data.jwt,
            id: decodedJWT.sub,
            email: decodedJWT.sub,
            roles: decodedJWT.roles.map((role) => role.authority),
            iat: decodedJWT.iat,
            exp: decodedJWT.exp,
          };

          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      const returnedToken = { ...token };
      if (user) {
        returnedToken.token = user.jwt;
        returnedToken.user = user;
      }
      return returnedToken;
    },
    session({ session, token }) {
      const returnedSession = { ...session };
      if (returnedSession.user) {
        returnedSession.user = token.user;
      }
      return returnedSession;
    },
  },
} satisfies NextAuthOptions;

// Use it in server contexts
export function getServerSession(
  ...args:
    | []
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
) {
  return getServerSessionNextAuth(...args, authConfig);
}
