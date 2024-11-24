import { UnauthorizedError } from '@/app/errors/unauthorized';
import { HashProvider } from '@/app/providers/hash.provider';
import { JwtProvider } from '@/app/providers/jwt.provider';
import { LoginService } from '@/app/services/auth/login.service';
import { Mock } from 'vitest';

describe('LoginService', () => {
  let sut: LoginService;

  const usernameMock = 'test username';
  const passwordMock = 'test password';
  const jwtProvider: JwtProvider = {
    sign: vi.fn(),
  };
  const hashProvider: HashProvider = {
    compare: vi.fn(),
  };

  beforeEach(() => {
    sut = new LoginService(
      usernameMock,
      passwordMock,
      jwtProvider,
      hashProvider,
    );

    vi.clearAllMocks();
  });

  describe('execute', () => {
    describe('when username and password are correct', () => {
      it('should return a token', async () => {
        (jwtProvider.sign as Mock).mockResolvedValue('token');
        (hashProvider.compare as Mock).mockResolvedValue(true);

        const result = await sut.execute(usernameMock, passwordMock);

        expect(jwtProvider.sign).toHaveBeenCalledTimes(1);
        expect(jwtProvider.sign).toHaveBeenCalledWith({
          username: usernameMock,
        });
        expect(hashProvider.compare).toHaveBeenCalledTimes(1);
        expect(hashProvider.compare).toHaveBeenCalledWith(
          passwordMock,
          passwordMock,
        );
        expect(result).toBe('token');
      });
    });

    describe('when login fails', () => {
      describe('and username is incorrect', () => {
        it('should throw an unauthorized error', async () => {
          await expect(
            sut.execute('wrong username', passwordMock),
          ).rejects.toThrow(UnauthorizedError);
        });
      });

      describe('and password is incorrect', () => {
        it('should throw an unauthorized error', async () => {
          (hashProvider.compare as Mock).mockResolvedValue(false);

          await expect(
            sut.execute(usernameMock, 'wrong password'),
          ).rejects.toThrow(UnauthorizedError);
          expect(hashProvider.compare).toHaveBeenCalledTimes(1);
          expect(hashProvider.compare).toHaveBeenCalledWith(
            'wrong password',
            passwordMock,
          );
        });
      });
    });
  });
});
