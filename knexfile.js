module.exports = {
  development: {
    client: 'pg',
    connection: {
      filename: 'postgres://localhost/byob'
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  }
};
