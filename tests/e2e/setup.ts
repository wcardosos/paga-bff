import { app } from '@/infra/app';

beforeAll(async () => {
  await app.ready();
});

afterAll(async () => {
  await app.close();
});
