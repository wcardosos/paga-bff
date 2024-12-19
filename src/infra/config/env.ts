import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  HOST: z.string().default('localhost'),
  PORT: z.coerce.number().default(3333),
  GOOGLE_SERVICE_ACCOUNT_EMAIL: z.string(),
  GOOGLE_PRIVATE_KEY: z.string().base64(),
  GOOGLE_SHEET_ID: z.string(),
  ACCESS_USERNAME: z.string(),
  ACCESS_PASSWORD: z.string(),
  JWT_SECRET: z.string(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('Invalid enviroment variables', parsedEnv.error.format());

  throw new Error('Invalid environment');
}

export const env: z.infer<typeof envSchema> = {
  ...parsedEnv.data,
  GOOGLE_PRIVATE_KEY: Buffer.from(
    parsedEnv.data.GOOGLE_PRIVATE_KEY,
    'base64',
  ).toString(),
};
