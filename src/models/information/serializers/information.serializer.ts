import {
  IInformation,
  TypeInformation,
} from '../interfaces/information.interface';
import { ModelEntity } from '../../model.serializer';

export class InformationEntity extends ModelEntity implements IInformation {
  id: number | string;

  user_id: null | number;

  status: boolean;

  type: TypeInformation | null;

  value: string | null;

  createdAt: Date;

  updatedAt: Date;
}
