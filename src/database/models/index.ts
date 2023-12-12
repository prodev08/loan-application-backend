import process from "process";
import { Sequelize } from "sequelize-typescript";
import Loan from "./Loan";
import Business from "./Business";
import { Environment, ENV_CONFIG } from "../types";
const config = require("../config/config");

const env = (process.env.NODE_ENV as Environment) || "development";
const dbConfig = config[env] as ENV_CONFIG;
const db: any = {};

let sequelize: Sequelize;

const models = [Loan, Business];

if (config.use_env_var) {
  sequelize = new Sequelize(
    process.env.DB_DATABASE || "defaultDbName",
    process.env.DB_USERNAME || "defaultUsername",
    process.env.DB_PASSWORD || "defaultPassword",
    {
      host: process.env.DB_HOST || "localhost",
      dialect: "postgres",
      port: parseInt(process.env.DB_PORT || "5432"),
      logging: false,
    }
  );
} else {
  sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
      ...dbConfig,
      dialect: "postgres",
      logging: false,
    }
  );
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

models.forEach((modelInit) => {
  const model = modelInit(sequelize);
  db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;
