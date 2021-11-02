import {
  IInformation,
  TypeInformation,
} from '../interfaces/information.interface';
import { ModelEntity } from '../../model.serializer';

export class InformationEntity extends ModelEntity implements IInformation {
  id: number | string;

  user_id: number | string | null;

  status: boolean;

  type: TypeInformation | null;

  value: string | null;

  createdAt: Date | null;

  updatedAt: Date | null;
}
