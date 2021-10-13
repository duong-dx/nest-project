import {
  IsEnum,
  IsOptional,
  // NotEquals,
  IsDate,
  IsNotEmpty,
  IsString,
  MaxLength,
  IsEmail,
} from 'class-validator';
import { Gender } from '../interfaces/user.interface';

export class CreateUserDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MaxLength(255)
  address: string | null;

  @IsEnum(Gender)
  // @NotEquals(Gender[Gender.other]) ignore "other"
  gender: Gender | null;

  @IsOptional()
  @IsDate()
  birthday: Date | null;

  @IsNotEmpty()
  password: string;
}
