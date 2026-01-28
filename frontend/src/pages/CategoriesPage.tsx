import { useEffect, useState } from "react";
import type { Category } from "../types/category";
import {
  getCategories,
  createCategory,
  deleteCategory,
} from "../api/categories.api";

import "../styles/categories.css";

function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");

  const load = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    await createCategory(name);
    setName("");
    load();
  };

  return (
    <div className="categories-container">
      <h1>📂 Categories</h1>

      <form onSubmit={handleSubmit} className="category-form">
        <input
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button>Create</button>
      </form>

      <ul>
        {categories.map((cat) => (
          <li key={cat.id}>
            {cat.name}
            <button onClick={() => deleteCategory(cat.id)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoriesPage;
