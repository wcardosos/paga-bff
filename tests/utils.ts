import { env } from '@/infra/config/env';
import { JwtProviderAdapter } from '@/infra/providers/jwt-provider-adapter';

export function createJwtToken(): Promise<string> {
  const jwtProvider = new JwtProviderAdapter(env.JWT_SECRET);

  return jwtProvider.sign({ username: 'username' });
}
