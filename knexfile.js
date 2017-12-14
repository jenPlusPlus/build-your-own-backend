module.exports = {
  development: {
    client: 'pg',
    connection: {
      filename: 'postgres://localhost/byob',
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds/dev',
    },
    useNullAsDefault: true,
  },
  test: {
    client: 'pg',
    connection: {
      filename: process.env.DATABASE_URL || 'postgres://localhost/byob_test',
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds/test',
    },
    useNullAsDefault: true,
  },
};
