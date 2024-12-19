import { app } from '@/infra/app';
import request from 'supertest';

describe('/welcome', () => {
  test('[GET] /', async () => {
    const response = await request(app.server).get('/welcome');

    expect(response.status).toBe(200);
    expect(response.text).toBe('Welcome to Paga BFF API!');
  });
});
