export default () => {
  const res = {
    database: {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USERNAME || 'user',
      password: process.env.DB_PASSWORD || 'password',
      databaseName: process.env.DB_NAME || 'database',
    },
  };
  return res;
};
