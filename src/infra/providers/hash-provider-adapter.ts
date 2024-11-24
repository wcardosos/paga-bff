import { HashProvider } from '@/app/providers/hash.provider';
import bcrypt from 'bcrypt';

export class HashProviderAdapter implements HashProvider {
  async compare(rawPassword: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, passwordHash);
  }
}
