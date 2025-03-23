import { Category, Task } from "../../types";

export type BackendError = {
  error: string;
}

export type LoginResponse = {
  token: string;
}

export type CategoriesResponse = Category[];

export type TasksResponse = Task[];

export type Exercise = {
  name: string;
  id: number;
}
export type ExerciseResponse = Exercise[];

type WorkoutTemplate = {
  id: number;
  exerciseIds: number[];
  name: string;
}
export type WorkoutTemplateResponse = WorkoutTemplate[];

export type Workout = {
  id: number;
  exercises: Exercise[];
  name: string;
}