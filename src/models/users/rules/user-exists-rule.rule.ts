import {
  registerDecorator,
  ValidationArguments,
  ValidatorConstraintInterface,
  ValidatorConstraint
} from 'class-validator';
import { UsersService } from '../users.service';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'UserExists', async: true })
@Injectable()
export class UserExistsRule implements ValidatorConstraintInterface {
  constructor(private readonly userService: UsersService) {}

  async validate(email: string) {
    try {
      await this.userService.getDataByEmail(email)
    } catch (e) {
      return true
    }

    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `User already exists`;
  }
}

export function UserExists() {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'UserExists',
      target: object.constructor,
      propertyName: propertyName,
      validator: UserExistsRule,
    });
  };
}