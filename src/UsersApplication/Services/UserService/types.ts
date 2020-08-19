export interface UserDataModel {
  create: (id: string) => void;
  read: (id: string) => void;
  update: (id: string) => void;
  delete: (id: string) => void;
}
