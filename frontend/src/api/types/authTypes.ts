export type User = {
  id: string;
  created: string;
  updated: string;
  username: string;
  email: string;
  emailVisibility: string;
  verified: boolean;
  name: string;
  avatar: string;
};

export type LoginParams = {
  name: string;
  password: string;
};

export type RegisterParams = {
  name: string;
  password: string;
};
