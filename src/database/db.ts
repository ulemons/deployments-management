import knex from 'knex';
import { DB_CONSTANTS } from './constants';
export type Enviroment = 'development' | 'staging' | 'production';

const db = knex({
  client: 'pg',
  connection: {
    database: 'deployment_db',
    user: 'deployment_user',
    password: 'deployment_pass',
    port: DB_CONSTANTS.PORT,
  },
  debug: true,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
});
export default db;
