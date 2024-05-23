export type DecodedJWT = {
  exp: number;
  iat: number;
  sub: string;
  roles: { authority: 'ROLE_ADMIN' | 'ROLE_USER' }[];
};

function isDecodedJWT(decodedJWT: object): decodedJWT is DecodedJWT {
  try {
    return (
      decodedJWT !== null &&
      typeof decodedJWT === 'object' &&
      'exp' in decodedJWT &&
      'iat' in decodedJWT &&
      'sub' in decodedJWT &&
      'roles' in decodedJWT &&
      typeof decodedJWT.exp === 'number' &&
      typeof decodedJWT.iat === 'number' &&
      typeof decodedJWT.sub === 'string' &&
      Array.isArray(decodedJWT.roles) &&
      decodedJWT.roles.every(
        (role: { authority: string }) =>
          role.authority === 'ROLE_ADMIN' || role.authority === 'ROLE_USER',
      )
    );
  } catch (error) {
    return false;
  }
}

export function parseJwt(token: string): DecodedJWT {
  const jwtObj = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  const decodedJWT: DecodedJWT = {
    exp: jwtObj.exp,
    iat: jwtObj.iat,
    sub: jwtObj.sub,
    roles: jwtObj.roles,
  };

  if (!isDecodedJWT(decodedJWT)) {
    throw new Error('Invalid JWT');
  }

  return decodedJWT;
}

export function getRolesFromJWT(decodedJWT: DecodedJWT): string[] {
  return decodedJWT.roles.map((role) => role.authority);
}
