exports.getConnection = () => {
    return require('knex')({
        client: 'mssql',
        connection: {
          host: process.env.db_host,
          user: process.env.db_user,
          password: process.env.db_password,
          database: process.env.database,
        },
        pool: {
          min: 1,
          max: 20,
        }
      });
}