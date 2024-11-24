import { UnauthorizedError } from '@/app/errors/unauthorized';
import { HashProvider } from '@/app/providers/hash.provider';
import { JwtProvider } from '@/app/providers/jwt.provider';

export class LoginService {
  constructor(
    private readonly username: string,
    private readonly password: string,
    private readonly jwtProvider: JwtProvider,
    private readonly hashProvider: HashProvider,
  ) {}

  async execute(username: string, password: string): Promise<string> {
    if (
      username !== this.username ||
      !(await this.isCorrectPassword(password))
    ) {
      throw new UnauthorizedError();
    }

    return this.jwtProvider.sign({ username });
  }

  private async isCorrectPassword(password: string): Promise<boolean> {
    return this.hashProvider.compare(password, this.password);
  }
}
