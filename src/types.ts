export type Category = {
  id: number;
  name: string;
}

export type Task = {
  categoryId: number;
  id: number;
  description: string;
}

type ExerciseSet = {
  weight: number,
  reps: number
}

export type ExerciseSets = {
  firstSet: ExerciseSet,
  secondSet?: ExerciseSet,
  thirdSet?: ExerciseSet,
  fourthSet?: ExerciseSet
}

export type ExerciseSetsWithId = ExerciseSets & {
  id: number;
}