require("dotenv").config();

const envConfig = {
  username: process.env.DB_USERNAME,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  dialect: "postgres",
};

module.exports = {
  development: envConfig,
  test: envConfig,
  production: envConfig,
  use_env_var: true,
};
