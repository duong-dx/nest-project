import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
const bcrypt = require('bcrypt')

@Injectable()
export class AuthService {
  hashPassword(password: string): Observable<string> {
    return bcrypt.hash(password, 12)
  }

  comparePassword(password: string, storePasswordHash: string): Observable<any> {
    return bcrypt.compare(password, storePasswordHash)
  }
}
