import { dicisionEngine } from "./apiClient";
import { DecisionType } from "./types";

export const requestDecision = async (data: DecisionType) => {
  // Real Code
  /* const { result }: any = await dicisionEngine.post<DecisionType[]>(
    "decision",
    data
  );*/

  // Test Decision Engine Code
  const result = data.preAssessment > 50 ? "success" : "failure";
  return result;
};
