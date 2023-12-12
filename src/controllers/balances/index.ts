import { NextFunction, Request, Response } from "express";
import { createLoan } from "../../services/loansService";
import { getBusinessById } from "../../services/businessService";
import { fetchBalances } from "../../integration/ballances";
import {
  cacher,
  getCacheKeyFromReq,
  APISuccess,
  BadRequestError,
} from "../../utils";

export const getBalances = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { businessId, loanAmount, accountName } = req.body;

    const cacheKey = getCacheKeyFromReq("getBalances", req);
    const cachedData = cacher.get(cacheKey);
    let result = null;

    if (cachedData) {
      result = { ...cachedData, cached: true };
    } else {
      const balances = await fetchBalances(businessId, accountName);
      const business = await getBusinessById(businessId);
      if (!business) throw new BadRequestError(new Error("No found Business!"));

      const createdLoan = await createLoan({
        business_id: business.id,
        account_name: accountName,
        amount: loanAmount,
        balances: JSON.stringify(balances),
        status: "pending",
      });

      result = { sheet: balances, loanId: createdLoan.id };
      cacher.set(cacheKey, result);
    }

    const response = new APISuccess(result);
    res.json(response.jsonify());
  } catch (error) {
    next(error);
  }
};
