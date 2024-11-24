import { JwtProvider } from '@/app/providers/jwt.provider';
import jwt from 'jsonwebtoken';

export class JwtProviderAdapter implements JwtProvider {
  private readonly TOKEN_EXPIRATION_TIME: string = '4h';

  constructor(private readonly secret: string) {}

  async sign(payload: { username: string }): Promise<string> {
    const options = {
      expiresIn: this.TOKEN_EXPIRATION_TIME,
    };

    return jwt.sign(payload, this.secret, options);
  }
}
