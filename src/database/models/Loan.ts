import { DataTypes, Optional, Model } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import { LoanType, Database } from "../types";
import { BusinessAtt } from "./Business";

export type LoanAtt = LoanType & {
  business_id: number;
};

export type LoanCreationAtt = Optional<LoanType, "id">;

export class Loan extends Model<LoanAtt, LoanCreationAtt> {
  declare id: number;
  declare business_id: number;
  declare account_name: string;
  declare amount: number;
  declare balances: string;
  declare status: string;
  declare business: BusinessAtt;

  static associate(db: Database) {
    Loan.belongsTo(db.Business, { as: "business", foreignKey: "business_id" });
  }
}

export default (sequelize: Sequelize) => {
  Loan.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      business_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      account_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      balances: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "loans",
      sequelize,
    }
  );
  return Loan;
};
