export type User = {
  id: string;
  created: string;
  updated: string;
  username: string;
  email: string;
  emailVisibility: boolean;
  verified: boolean;
  avatar: string;
};

export type LoginParams = {
  name: string;
  password: string;
};

export type RegisterParams = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
};