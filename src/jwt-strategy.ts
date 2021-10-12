import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { AuthPayload } from './auth/interfaces/auth-payload.interface';

@Injectable()
export class JsonWebTokenStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '12345678',
    });
  }

  async validate(payload: AuthPayload) {
    return { name: payload.name, email: payload.email, id: payload.id };
  }
}
