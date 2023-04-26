import { Options } from '@mikro-orm/core';
import * as dotenv from 'dotenv'

dotenv.config({
    path: `./${process.env.NODE_ENV}.env`
}) //sets up dotenv from env file

const config = {
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  dbName: process.env.DB_NAME,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  type: 'mysql',
  port: +(process.env.DB_PORT as string) || 3308,
  debug: true,
  allowGlobalContext: true,
} as Options;

export default config;