import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('projects', table => {
    table.increments('id').primary();
    table.integer('user_id').notNullable();
    table.string('name').notNullable();
    table.string('url');
    table.string('app_secret').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table
      .foreign('user_id')
      .references('id')
      .inTable('users');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('projects');
}
