import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';

const ormConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Reagan',
  database: 'training-management-app',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize: false,
  logging: true,
  migrationsRun: true,
};

export default ormConfig;
