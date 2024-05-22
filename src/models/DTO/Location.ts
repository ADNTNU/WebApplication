export type PopularDestination = {
  id: number;
  name: string;
  image: string;
  flightCount: number;
};

export type Location = {
  id: number;
  country: string;
  name: string;
  image: string;
};

export type PostLocation = {
  country: string;
  name: string;
  image: string;
};

export type PutLocation = {
  id: string;
  country: string;
  name: string;
  image: string;
};

export type DeleteLocation = {
  id: string;
};
