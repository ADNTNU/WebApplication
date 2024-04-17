import { cookies, headers } from 'next/headers';

import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from '@auth/core/jwt';
import { usePathname } from '@internationalization/navigation';

async function refreshAccessToken(token: JWT) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ userID: token.userId }),
    });

    const { success, data } = await res.json();

    if (!success) {
      console.error('The token could not be refreshed!');
      throw data;
    }

    // TODO: Parse the data from the response
    // const decodedAccessToken = JSON.parse(
    //   Buffer.from(data.accessToken.split('.')[1], 'base64').toString(),
    // );

    return {
      ...token,
      // accessToken: data.accessToken,
      // refreshToken: data.refreshToken || token.refreshToken,
      // idToken: data.idToken,
      // accessTokenExpires: decodedAccessToken.exp || 0 * 1000,
      error: '',
    };
  } catch (error) {
    console.error(error);

    // return an error if somethings goes wrong
    return {
      ...token,
      error: 'RefreshAccessTokenError', // attention!
    };
  }
}

export const config: NextAuthConfig = {
  trustHost: true,
  theme: {
    logo: 'https://next-auth.js.org/img/logo/logo-sm.png',
  },
  providers: [
    // we use credentials provider here
    CredentialsProvider({
      credentials: {
        email: {
          label: 'email',
          type: 'email',
          placeholder: 'ola.nordmann@example.com',
        },
        password: {
          label: 'password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        const payload = {
          email: credentials.email,
          password: credentials.password,
        };

        const res = await fetch(`${process.env.API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        const user = await res.json();

        if (!res.ok) {
          throw new Error(user.message);
        }

        if (res.ok && user) {
          const prefix = process.env.NODE_ENV === 'development' ? 'Dev-' : '';

          cookies().set({
            name: `${prefix}FlightFinder.refresh-token`,
            value: user.refreshToken,
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
          });

          return user;
        }

        return null;
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/login',
    signOut: '/logout',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      const returnedToken = token;
      if (account && user) {
        returnedToken.id = user.id;
        returnedToken.accessToken = user.accessToken;
        returnedToken.refreshToken = user.refreshToken;
        returnedToken.role = 'Unknown'; // the user role

        const decodedAccessToken = JSON.parse(
          Buffer.from(user.accessToken.split('.')[1], 'base64').toString(),
        );

        if (decodedAccessToken) {
          returnedToken.userId = decodedAccessToken.sub as string;
          returnedToken.accessTokenExpires = decodedAccessToken.exp * 1000;
        }

        // get some info about user from the id token
        const decodedIdToken = JSON.parse(
          Buffer.from(user.idToken.split('.')[1], 'base64').toString(),
        );

        if (decodedIdToken) {
          returnedToken.email = decodedIdToken.email;
          returnedToken.cognitoGroups = decodedIdToken['cognito:groups'];
          returnedToken.role = decodedIdToken['cognito:groups'].length
            ? decodedIdToken['cognito:groups'][0]
            : 'Unknown';
        }
      }

      // if our access token has not expired yet, return all information except the refresh token
      if (token.accessTokenExpires && Date.now() < Number(token.accessTokenExpires)) {
        const { refreshToken, ...rest } = token;

        return rest;
      }

      const refreshedToken = await refreshAccessToken(token);
      return refreshedToken;
    },

    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          email: token.email as string,
          cognitoGroups: token.cognitoGroups as string[],
          accessToken: token.accessToken as string,
          accessTokenExpires: token.accessTokenExpires as number,
          role: token.role as string,
        },
        error: token.error,
      };
    },
    authorized({ request, auth }) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const pathname = usePathname();

      // TODO: Add private routes here
      // const searchTerm = request.nextUrl.pathname.split('/').slice(0, 2).join('/');

      // if the private routes array includes the search term, we ask authorization here and forward any unauthorized users to the login page
      // if (privateRoutes.includes(searchTerm)) {
      //   console.warn(`${auth ? 'Can' : 'Cannot'} access private route ${searchTerm}`);
      //   return !!auth;
      // }
      if (
        // TODO: Add the correct paths where signed in users shoudl be redirected away here
        pathname.startsWith('/login') ||
        pathname.startsWith('/forgot-password') ||
        pathname.startsWith('/signup')
      ) {
        const isLoggedIn = !!auth;

        if (isLoggedIn) {
          return Response.redirect(new URL('/', request.nextUrl));
        }

        return true;
      }

      return true;
    },
  },
  debug: process.env.NODE_ENV === 'development',
} satisfies NextAuthConfig;

export const { auth, handlers } = NextAuth(config);
