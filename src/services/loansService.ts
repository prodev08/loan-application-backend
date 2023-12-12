import { FindOptions } from "sequelize";
import { Loan, LoanCreationAtt } from "../database/models/Loan";
import { LoanAtt } from "../database/models/Loan";

export const createLoan = async (loanData: LoanCreationAtt): Promise<Loan> => {
  try {
    const loan = await Loan.create(loanData);
    return loan;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getLoanById = async (loanId: number, options?: FindOptions) => {
  try {
    const loan = await Loan.findByPk(loanId, options);
    return loan;
  } catch (error) {
    throw error;
  }
};

export const updateLoan = async (
  loanId: number,
  newData: Record<string, any>,
  options?: LoanAtt
) => {
  try {
    await Loan.update(newData, {
      where: { id: loanId },
      ...options,
    });
    const updatedLoan = await getLoanById(loanId);
    return updatedLoan;
  } catch (error) {
    throw error;
  }
};
