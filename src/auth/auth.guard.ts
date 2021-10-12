import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticationGuard extends AuthGuard('jwt') {}
