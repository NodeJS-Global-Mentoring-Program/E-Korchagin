
export type User = {
  Id: string;
  Login: string;
  Age: number;
}

export type NewUser = User & {
  Password: string;
}

export type UserDTO = User & {
  Password: string;
  IsDeleted: boolean;
};