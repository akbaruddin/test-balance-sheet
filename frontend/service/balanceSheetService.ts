import { baseAPI } from "./baseAPI";

export const balanceSheetService = async () => {
  const res = await baseAPI.get("/api/balance-sheet");
  return res.data;
}