export type ExpenseSubType = "Activo" | "Pasivo";

export interface ExpenseCar {
  car_id: string;
  movement_id: string;
  year: number;
  brand: string;
  color: string;
  model: string;
  amount: number;
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
  type: string;
  description: string;
  closing_date: string;
  cars: ExpenseCar[];
  movements_ids: string[];
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
