export interface SignUpUserData {
  name: string;
  login: string;
  password: string;
};

export interface LoginUserData {
  login: string;
  password: string;
};

export interface User {
  id: string;
  name: string;
  login: string;
}

export interface Token {
  token: string;
}
