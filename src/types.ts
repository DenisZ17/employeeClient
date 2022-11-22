export interface IUser {
  id: string;
  username: string;

  email: string;
  password: string;
  roles: string;
  active: boolean;
}

export interface INote {
  id: string;
  title: string;
  text: string;
  completed: boolean;
  userId: number;
}

export interface ILogin {
  username: "";
  password: "";
}
