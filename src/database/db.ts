import knex from 'knex';
import { KNEX_CONFIG } from './constants';
export type Enviroment = 'development' | 'staging' | 'production';

const db = knex(KNEX_CONFIG.development);
export default db;
