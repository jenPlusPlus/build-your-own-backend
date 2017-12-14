exports.up = (knex, Promise) =>
  Promise.all([
    knex.schema.createTable('teams', (table) => {
      table.increments('id').primary();
      table.string('city');
      table.string('name');
      table.timestamps(true, true);
    }),
    knex.schema.createTable('players', (table) => {
      table.increments('id').primary();
      table.integer('team_id').unsigned();
      table.foreign('team_id').references('teams.id');
      table.integer('number').unsigned();
      table.string('name');
      table.string('position');
      table.integer('age').unsigned();
      table.string('height');
      table.integer('weight').unsigned();
      table.string('experience');
      table.string('college');
      table.timestamps(true, true);
    }),
  ]);


exports.down = (knex, Promise) =>
  Promise.all([
    knex.schema.dropTable('players'),
    knex.schema.dropTable('teams'),
  ]);
