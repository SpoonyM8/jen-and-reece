export type Category = {
  id: number;
  name: string;
}

export type Task = {
  category_id: number;
  id: number;
  description: string;
}