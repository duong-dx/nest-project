export interface IProfile {
  id: number | string;
  user_id: number | null;
  avatar: string | null;
  address: string | null;
  gender: Gender;
  birthday: null | string | Date;
  phone: string | null;
  position: Position | null;
  description: string | null;
}

export enum Gender {
  male = 'male',
  female = 'female',
  other = 'other',
}

export enum Position {
  teacher = 'teacher',
  student = 'student',
  farmer = 'farmer',
  shipper = 'shipper',
  developer = 'developer',
  architect = 'architect',
  scientist = 'scientist',
  other = 'other',
}
