import { FindOptions } from "sequelize";
import { Business } from "../database/models/Business";

export const getBusinessById = async (
  businessId: number,
  options?: FindOptions
) => {
  try {
    const business = await Business.findByPk(businessId, options);
    return business;
  } catch (error) {
    throw error;
  }
};
