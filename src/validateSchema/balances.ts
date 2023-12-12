import Joi from "joi";

export const requestBalanceSchema = Joi.object({
  businessId: Joi.string().required(),
  loanAmount: Joi.number()
    .integer()
    .min(0)
    .max(parseInt(process.env.LIMIT_MAX_AMOUNT || "10000"))
    .required(),
  accountName: Joi.string().required(),
});
