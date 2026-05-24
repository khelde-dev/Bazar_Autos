export type UserRole = "admin" | "user";

/** Shape devuelta por GET /users */
export interface UserItem {
  id: string;
  name: string;
  email: string;
  username: string;
  role: UserRole;
}

export interface UsersListResponse {
  success: boolean;
  data: UserItem[];
  message: string;
}

/** POST /users */
export interface CreateUserPayload {
  username: string;
  password: string;
  full_name: string;
  email: string;
  role: UserRole;
}

/** PUT /users/:id */
export interface UpdateUserPayload {
  username: string;
  password: string;
  full_name: string;
  email: string;
  role: UserRole;
}
