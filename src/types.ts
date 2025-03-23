export type Category = {
  id: number;
  name: string;
}

export type Task = {
  categoryId: number;
  id: number;
  description: string;
}
