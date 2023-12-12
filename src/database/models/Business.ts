import {
  DataTypes,
  Optional,
  Model,
  HasManyGetAssociationsMixin,
} from "sequelize";
import { Sequelize } from "sequelize-typescript";
import { Loan } from "./Loan";
import { Database } from "../types";

export interface BusinessAtt {
  id: number;
  name: string;
  year: number;
}

export type BusinessCreationAtt = Optional<BusinessAtt, "id">;

export class Business extends Model<BusinessAtt, BusinessCreationAtt> {
  declare id: number;
  declare year: number;

  declare getLoans: HasManyGetAssociationsMixin<Loan>;

  static associate(db: Database) {
    Business.hasMany(db.Loan, { foreignKey: "business_id" });
  }
}

export default (sequelize: Sequelize) => {
  Business.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "businesses",
      sequelize,
    }
  );

  return Business;
};
