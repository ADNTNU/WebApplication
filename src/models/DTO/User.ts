export type User = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  permission: string;
};

export type GetUser = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
};
