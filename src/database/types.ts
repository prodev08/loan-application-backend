import { Sequelize } from "sequelize";
import { Business } from "./models/Business";
import { Loan } from "./models/Loan";

export type Environment = "development" | "test" | "production";

export type DB_DIALECT = "mysql" | "postgres" | "sqlite" | "mssql";

export type ENV_CONFIG = {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: DB_DIALECT;
};

export type DB_CONFIG = {
  [key in Environment]: ENV_CONFIG;
} & {
  use_env_var: boolean;
};

export interface Database {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  Business: typeof Business;
  Loan: typeof Loan;
}

export type LoanType = {
  id: number;
  business_id: number;
  account_name: string;
  amount: number;
  balances: string;
  status: string;
};
