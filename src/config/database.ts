/* eslint-disable import/prefer-default-export */
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { FishWiki } from '../models/fishWiki';

export const connection = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'db',
  port: Number(process.env.POSTGRES_PORT) || 5433,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [FishWiki],
  synchronize: true,
  logging: false,
  extra: process.env.POSTGRES_HOST
    ? {
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : null,
});
