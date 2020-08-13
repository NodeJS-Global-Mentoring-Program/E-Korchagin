
export type User = {
  Id: string;
  Login: string;
  Age: number;
}

export type NewUser = Omit<User, "Id"> & {
  Password: string;
}

export type UserDTO = User & {
  Password: string;
  IsDeleted: boolean;
};