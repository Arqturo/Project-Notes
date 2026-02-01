import { useEffect, useState } from "react";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../api/categories.api";

import type { Category } from "../types/category";

import CategoryPanel from "../components/categories/CategoryPanel";

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const loadCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleCreate = async (name: string) => {
    const created = await createCategory(name);
    setCategories((prev) => [...prev, created]);
  };

  const handleUpdate = async (id: number, name: string) => {
    const updated = await updateCategory(id, name);
    setCategories((prev) => prev.map((c) => (c.id === id ? updated : c)));
  };

  const handleDelete = async (id: number) => {
    await deleteCategory(id);
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <CategoryPanel
            categories={categories}
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
