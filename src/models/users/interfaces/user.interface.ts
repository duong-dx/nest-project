export interface IUser {
  id: number | string,
  name: null | string,
  email: string,
  address: string | null,
  gender: boolean,
  birthday: null | string | Date
  password: string
}