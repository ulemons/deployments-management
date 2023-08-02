import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('data_events', table => {
    table.increments('id').primary();
    table.integer('project_id').notNullable();
    table.string('name');
    table.jsonb('payload');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table
      .foreign('project_id')
      .references('id')
      .inTable('projects');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('deployments');
}
