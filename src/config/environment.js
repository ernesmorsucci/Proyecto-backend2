import { config } from 'dotenv';

config();

export const env = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  COOKIE_SECRET: process.env.COOKIE_SECRET,
  MAILING_ACCOUNT: process.env.MAILING_ACCOUNT,
  MAILING_PASS: process.env.MAILING_PASS
}