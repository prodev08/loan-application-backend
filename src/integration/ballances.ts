import { accoutingProviders } from "./apiClient";
import { BalanceType } from "./types";

export const fetchBalances = async (businessId: string, account: string) => {
  const { data }: any = await accoutingProviders
    .find((provider) => provider.accountName === account)
    ?.api.get<BalanceType[]>(`sheet?businessId=${businessId}`);

  return data;
};
