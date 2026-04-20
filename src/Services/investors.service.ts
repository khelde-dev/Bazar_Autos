import type {
  InvestmentsListResponse,
  RegisterInvestmentPayload,
  TransactionHistoryResponse,
  TransactionPayload,
  TransactionTypeFilter,
} from "../Pages/Investments/Types/Investments.types";
import { api } from "./axiosConfig";

// POST /investors — registrar una nueva inversión
export const registerInvestment = async (payload: RegisterInvestmentPayload) => {
  const { data } = await api.post("/investors", payload);
  return data;
};

interface ListQuery {
  year?: number | null;
  month?: number | null; // 1-12 para el backend
}

// GET /investors/:user_id?year=YYYY&month=M
export const getInvestmentsByUser = async (
  userId: string,
  query: ListQuery = {}
): Promise<InvestmentsListResponse> => {
  const params: Record<string, string | number> = {};
  if (query.year) params.year = query.year;
  if (query.month) params.month = query.month;
  const { data } = await api.get(`/investors/${userId}`, { params });
  return data;
};

// POST /investors/:investor_id/transactions
export const registerTransaction = async (investorId: string, payload: TransactionPayload) => {
  const { data } = await api.post(`/investors/${investorId}/transactions`, payload);
  return data;
};

interface TransactionsQuery {
  year?: number | null;
  month?: number | null;
  type?: TransactionTypeFilter; // "Entrada" | "Salida" | undefined (todos)
}

// GET /investors/:investor_id/transactions?year=YYYY&month=M&type=Entrada
export const getTransactionsByInvestment = async (
  investorId: string,
  query: TransactionsQuery = {}
): Promise<TransactionHistoryResponse> => {
  const params: Record<string, string | number> = {};
  if (query.year) params.year = query.year;
  if (query.month) params.month = query.month;
  if (query.type) params.type = query.type;
  const { data } = await api.get(`/investors/${investorId}/transactions`, { params });
  return data;
};
