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