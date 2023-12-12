export type BalanceType = {
  id: number;
  year: number;
  month: number;
  profitOrLoss: number;
  assetsValue: number;
};

export type DecisionType = {
  name: string;
  year: number;
  summary: number;
  preAssessment: number;
};
