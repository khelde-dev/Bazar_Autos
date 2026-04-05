// ============================================================================
// Tipos de dominio
// ============================================================================

export type TransactionType = "Entrada" | "Salida";
export type TransactionTypeFilter = TransactionType; // alias para filtros

export interface Investment {
  investor_id: string;
  user_id: string;
  investment_amount: string; // backend lo manda como string numérico
  created: string; // ISO
  updated: string; // ISO
}

export interface Transaction {
  transaction_id: string;
  type: TransactionType;
  amount: string; // backend lo manda formateado "$1,464.00"
  concept: string;
  created: string; // ISO
}

// ============================================================================
// Respuestas del backend
// ============================================================================

interface ApiMetadata {
  timestamp: string;
  requestId: string;
  dataCount: number;
  dataCountFormatted: string;
}

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  message: string;
  metadata: ApiMetadata;
}

export type InvestmentsListResponse = ApiEnvelope<{
  current_total_balance: number;
  data: Investment[];
}>;

export interface TransactionSummary {
  total_entradas: number;
  total_salidas: number;
  total_neto: number;
}

export type TransactionHistoryResponse = ApiEnvelope<{
  summary: TransactionSummary;
  data: Transaction[];
}>;

// ============================================================================
// Payloads
// ============================================================================

export interface RegisterInvestmentPayload {
  user_id: string;
  investment_amount: number;
}

export interface TransactionPayload {
  amount: number;
  type: TransactionType;
  concept: string;
}

// ============================================================================
// Estado de formularios
// ============================================================================

export interface InvestmentFormState {
  user_id: string;
  investment_amount: number;
}

export const INITIAL_INVESTMENT_STATE: InvestmentFormState = {
  user_id: "",
  investment_amount: 0,
};

export interface TransactionFormState {
  type: TransactionType;
  amount: number;
  concept: string;
}

export const INITIAL_TRANSACTION_STATE: TransactionFormState = {
  type: "Entrada",
  amount: 0,
  concept: "",
};

export const TRANSACTION_TYPES: TransactionType[] = ["Entrada", "Salida"];
