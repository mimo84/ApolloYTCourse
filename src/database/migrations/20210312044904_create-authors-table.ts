import { Knex } from 'knex';
import { table } from 'node:console';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('authors', (table: Knex.TableBuilder) => {
    table.uuid('id').primary().notNullable().unique();
    table.string('name').nullable();
    table.integer('age');
    table.integer('rating');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {}
