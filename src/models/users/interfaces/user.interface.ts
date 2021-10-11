export interface IUser {
  id: number | string;
  name: null | string;
  email: string;
  address: string | null;
  gender: Gender;
  birthday: null | string | Date;
  password: string;
}

export enum Gender {
  male = 'male',
  female = 'female',
  other = 'other',
}
