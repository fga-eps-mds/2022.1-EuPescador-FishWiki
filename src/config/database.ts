import { FishWiki } from '../models/fishWiki';
import { DataSource } from 'typeorm'

export const connection =  new DataSource({
  type: "postgres",
  host: "db",
  port: 5433,
  username: "root",
  password: "admin",
  database: "user",
  entities: [FishWiki],
  synchronize: true,
  logging: false
});