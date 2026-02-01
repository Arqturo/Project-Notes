import { useEffect, useState } from "react";
import type { Category } from "../../types/category";

interface Props {
  categories: Category[];
  onCreate: (name: string) => Promise<void>;
  onUpdate: (id: number, name: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

const CategoryPanel = ({ categories, onCreate, onUpdate, onDelete }: Props) => {
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    if (editingId === null) {
      setName("");
    }
  }, [editingId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return;

    if (editingId !== null) {
      await onUpdate(editingId, name);
    } else {
      await onCreate(name);
    }

    setName("");
    setEditingId(null);
  };

  return (
    <div className="card shadow-sm rounded-4 fade-in">
      <div className="card-body p-4">
        {/* HEADER */}

        {/* FORM */}
        <form
          className="form note-form  row g-2 align-items-center mb-4"
          onSubmit={handleSubmit}
        >
                <h2 className="mb-4">📂 Categorías</h2>
                        <div className="d-flex justify-content-between align-items-center mb-4">

          {editingId !== null && (
            <span className="badge bg-warning text-dark">Editando</span>
          )}
        </div>
          <div className="col flex-grow-1">
            <input
              className="form-control form-control-lg"
              placeholder="Nombre de la categoría"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="col-auto d-flex gap-2">
            <button className="btn btn-primary px-4" type="submit">
              {editingId !== null ? "Actualizar" : "Crear"}
            </button>

            {editingId !== null && (
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setEditingId(null)}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>

        {/* LIST */}
        <div className="task-list row g-3 mt-3 list-group list-group-flush">
          {categories.length === 0 && (
            <li className="list-group-item text-muted text-center py-4">
              No hay categorías creadas
            </li>
          )}

          {categories.map((cat) => (
            <div
              key={cat.id}
              className="col-md-4 list-group-item d-flex justify-content-between align-items-center py-3"
            >
              <div className="note-card">
              <span className="fw-medium">{cat.name}</span>

              <div className="btn-group btn-group-sm">
                <p className="note-card__content"></p>
                <div className="note-card__actions-left">
                <button
                  className="edit-btn btn btn-sm btn-outline-primary"
                  onClick={() => {
                    setEditingId(cat.id);
                    setName(cat.name);
                  }}
                >
                  Editar
                </button>

                <button
                  className="delete-btn btn btn-sm btn-outline-danger"
                  onClick={() => onDelete(cat.id)}
                >
                  Eliminar
                </button>
                </div>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPanel;
