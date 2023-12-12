import { NextFunction, Request, Response } from "express";
import db from "../../database/models";
import { getLoanById, updateLoan } from "../../services/loansService";
import { requestDecision } from "../../integration/decision";
import { APISuccess, BadRequestError } from "../../utils";
import { BalanceType } from "../../integration/types";

export const submit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { loanId } = req.body;

    const loan = await getLoanById(loanId, {
      include: { model: db.Business, as: "business" },
    });
    if (!loan) throw new BadRequestError(new Error("Loan not found!"));

    const business = loan.business;

    const currentDate = new Date();
    const balances = JSON.parse(loan.balances).filter(
      (balance: BalanceType) => balance.year === currentDate.getFullYear()
    );
    if (!balances)
      throw new BadRequestError(new Error("Balances not found in this year!"));

    const [preAssessment, totalprofit] = dataProcess(balances, loan.amount);

    const request = {
      name: business.name,
      year: business.year,
      summary: totalprofit,
      preAssessment: preAssessment,
    };

    const desicion = await requestDecision(request);
    if (!desicion)
      throw new BadRequestError(new Error("Decision Engine has some error!"));

    const updatedLoan = await updateLoan(loanId, {
      status: desicion === "success" ? "success" : "failure",
    });

    const response = new APISuccess(updatedLoan);
    res.json(response.jsonify());
  } catch (error) {
    next(error);
  }
};

const dataProcess = (balances: BalanceType[], loanAmount: number) => {
  let totalprofit = 0;
  let preAssessment = 20;
  let averageAsset = 0;

  balances.forEach((balance) => {
    totalprofit += balance.profitOrLoss;
    averageAsset += balance.assetsValue;
  });

  if (averageAsset / balances.length > loanAmount) {
    preAssessment = 100;
  } else if (totalprofit > 0) {
    preAssessment = 60;
  }

  return [preAssessment, totalprofit];
};
