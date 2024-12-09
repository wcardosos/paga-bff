import { app } from '@/infra/app';
import request from 'supertest';

describe('/health', () => {
  test('[GET] /', async () => {
    const response = await request(app.server).get('/health');

    expect(response.status).toBe(200);
  });
});
