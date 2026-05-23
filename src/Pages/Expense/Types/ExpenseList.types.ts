export type ExpenseSubType = "Activo" | "Pasivo";

export interface ExpenseCar {
  id: string;
  year: number;
  brand: string;
  color: string;
  model: string;
  status: string;
}

export interface ExpenseCategory {
  id: string;
  name: string;
  type: ExpenseSubType;
}

export interface ExpenseMovement {
  id: string;
  type: string;
  amount: number;
  description: string;
  closing_date: string;
}

export interface SharedExpenseRow {
  category: ExpenseCategory;
  cars: ExpenseCar[];
  total: number;
}

export interface IndividualExpenseRow {
  movement: ExpenseMovement;
  category: ExpenseCategory;
  car: ExpenseCar;
}

export interface ExpensePagination {
  total: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ExpenseListParams {
  limit: number;
  page: number;
  isShared: boolean;
  year?: number;
  month?: number;
  type?: string;
  name?: string;
}
