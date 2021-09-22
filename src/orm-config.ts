import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const config: MysqlConnectionOptions = {
  type: 'mysql',
  database: 'nest',
  username: 'root',
  password: 'root',
  port: 3306,
  host: '127.0.0.1',
  entities: ['dist/models/**/*.entity{.ts,.js}'],
  synchronize: false,
  dropSchema: false,
  migrations: [
    "dist/database/migrations/*.js",
  ],
  cli: {
    migrationsDir: 'src/database/migrations'
  }
}

export default config;