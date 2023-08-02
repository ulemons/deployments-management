import type { Knex } from "knex";
export type Enviroment = "development" | "staging" | "production"

export const DB_CONSTANTS = {
    PORT: 5430,
  };
  
export const KNEX_CONFIG: { [key in Enviroment]: Knex.Config } = {
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
}