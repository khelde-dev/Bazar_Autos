//Se cambiara segun sea Id,name,UUID, ambos XD o todos U_U
export interface SaleInvestment {
  investorName: string;
  amount: number;
  registrationDate: string;
  notes: string;
}

export const INITIAL_SALE_STATE = {
  investorName: "",
  amount: 0,
  registrationDate: new Date().toISOString().split('T')[0], 
  notes: "",
};
//DUMMY
export const INVESTOR_OPTIONS = [
  "Inversionista A",
  "Inversionista B",
  "Mukes",
  "WILT"
] as const;