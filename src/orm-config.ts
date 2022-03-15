import { TypeOrmModuleOptions } from '@nestjs/typeorm';

enum DatabaseConnectionEnum {
  'mysql' = 'mysql',
  'postgres' = 'postgres',
}

const type: string[] = ['mysql', 'postgres'];

const databaseConnect: DatabaseConnectionEnum =
  type.indexOf(process.env.DB_CONNECTION) > -1
    ? (process.env.DB_CONNECTION as DatabaseConnectionEnum)
    : DatabaseConnectionEnum.mysql;

const config: TypeOrmModuleOptions = {
  type: databaseConnect,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT),
  host: process.env.DB_HOST,
  entities: ['dist/models/**/*.entity{.ts,.js}'],
  synchronize: false,
  dropSchema: false,
  migrations: ['dist/database/migrations/*.js'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};

export default config;
