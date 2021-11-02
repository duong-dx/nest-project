export interface IInformation {
  id: number | string;
  user_id: number | string | null;
  status: boolean;
  type: TypeInformation | null;
  value: string;
}

export enum TypeInformation {
  'socket_id' = 'socket_id',
  'device_id' = 'device_id',
}
