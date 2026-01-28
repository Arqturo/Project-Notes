import type { Category } from "./category";

export interface Note {
  id: number;
  title: string;
  content: string;
  isArchived: boolean;
  createdAt: string;

  categories: Category[];
}
