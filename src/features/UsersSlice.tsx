export interface Users {
  email: string;
  password: string;
}

export interface AuthUsers {
  users: Users[];
  currentUser: Users | null;
}
