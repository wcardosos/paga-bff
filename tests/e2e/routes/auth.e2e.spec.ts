import { app } from '@/infra/app';
import request from 'supertest';

import * as exports from '@/infra/config/env';
vi.spyOn(exports, 'env', 'get').mockReturnValue({
  NODE_ENV: 'test',
  PORT: 3333,
  GOOGLE_SERVICE_ACCOUNT_EMAIL: 'google email',
  GOOGLE_PRIVATE_KEY: 'google private key',
  GOOGLE_SHEET_ID: 'google sheet id',
  ACCESS_USERNAME: 'username',
  ACCESS_PASSWORD:
    '$2b$10$iVebKoahzHEGsJq3eD35LukVYmg4qHeTskL1TXzDYR8MDWNR6YboS',
  JWT_SECRET: 'jwt secret',
});

describe('/auth', () => {
  const ACCESS_USERNAME_MOCK = 'username';
  const ACCESS_PASSWORD_MOCK = 'password test';

  describe('[POST] /login', async () => {
    test('should return token with correct credentials', async () => {
      const response = await request(app.server).post('/auth/login').send({
        username: ACCESS_USERNAME_MOCK,
        password: ACCESS_PASSWORD_MOCK,
      });

      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual({ token: expect.any(String) });
    });

    test('should return 401 when credentials are invalid', async () => {
      const response = await request(app.server).post('/auth/login').send({
        username: ACCESS_USERNAME_MOCK,
        password: 'invalid password',
      });

      expect(response.status).toBe(401);
    });

    test('should return 400 when credentials are not provided', async () => {
      const response = await request(app.server).post('/auth/login').send({});

      expect(response.status).toBe(400);
      expect(response.text).toBe('Credentials must be provided');
    });
  });
});
