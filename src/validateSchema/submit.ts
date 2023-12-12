import Joi from "joi";

export const requestSubmitSchema = Joi.object({
  loanId: Joi.string().required(),
});
