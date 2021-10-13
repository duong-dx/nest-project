import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { AuthPayload } from '../interfaces/auth-payload.interface';
import { JWT_SECRET_KEY } from '../../config/constants';

@Injectable()
export class JsonWebTokenStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET_KEY,
    });
  }

  async validate(payload: AuthPayload) {
    return { name: payload.name, email: payload.email, id: payload.id };
  }
}
