export type CategoryType = "Activo" | "Pasivo";

export interface MovementCategory {
  category_id: string;
  name: string;
  type: CategoryType;
}

export interface CategoriesResponse {
  success: boolean;
  data: MovementCategory[];
  message: string;
}

export interface CategoryPayload {
  name: string;
  type: CategoryType;
}
