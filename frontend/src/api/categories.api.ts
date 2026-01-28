import { api } from "./axios";
import type { Category } from "../types/category";

export const getCategories = async (): Promise<Category[]> => {
  const res = await api.get("/categories");
  return res.data;
};

export const createCategory = (name: string) =>
  api.post("/categories", { name });

export const deleteCategory = (id: number) => api.delete(`/categories/${id}`);
