import { DataSource } from 'typeorm';
import { Users } from './user/entities/user.entity';
import { Roles } from './roles/entities/roles.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 8003,
  username: 'postgres',
  password: 'amaan252003',
  database: 'business-talk',
  schema: 'main',
  entities: [Roles, Users],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
