//Se cambiara segun sea Id,name,UUID, ambos XD o todos U_U
export interface SaleInvestment {
  user_id: string;
  investment_amount: number;
  //notes: string;
}

export const INITIAL_SALE_STATE = {
  user_id: "",
  investment_amount: 0,
  //notes: "",
};
//DUMMY
export const INVESTOR_OPTIONS = [
  "Inversionista A",
  "Inversionista B",
  "Mukes",
  "WILT"
] as const;