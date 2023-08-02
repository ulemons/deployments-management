import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('deployments', table => {
    table.increments('id').primary();
    table.integer('project_id').notNullable();
    table.integer('deployed_in');
    table.string('status');
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
