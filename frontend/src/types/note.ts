import type { Category } from "./category";

export interface Note {
  id: number;
  title: string;
  content: string;
  isArchived: boolean;
  categories: Category[];
  createdAt: string;
}
