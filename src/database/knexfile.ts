import type { Knex } from "knex";
import { DB_CONSTANTS } from "./constants";

export type Enviroment = "development" | "staging" | "production"
export const knexConfig: { [key in Enviroment]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      database: "deployment_db",
      user: "deployment_user",
      password: "deployment_pass",
      port: DB_CONSTANTS.PORT
    },
    debug:true,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },
  staging: {
    client: "pg",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },
  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};


module.exports = knexConfig;
