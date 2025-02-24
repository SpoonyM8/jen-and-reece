import { Category, Task } from "../../types";

export type BackendError = {
  error: string;
}

export type LoginResponse = {
  token: string;
}

export type CategoriesResponse = Category[];

export type TasksResponse = Task[];