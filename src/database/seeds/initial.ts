import { Knex } from 'knex';
import { default as users } from './users.json';
import { default as projects } from './projects.json';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('projects').del();
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert(users);
  await knex('projects').insert(projects);
}
