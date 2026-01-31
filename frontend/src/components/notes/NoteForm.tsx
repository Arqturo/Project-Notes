import { useEffect, useState } from "react";
import type { Category } from "../../types/category";
import type { Note } from "../../types/note";

interface NotePayload {
  title: string;
  content: string;
  categoryId?: number;
}

interface Props {
  categories: Category[];
  editingNote: Note | null;
  onCreate: (payload: NotePayload) => Promise<void>;
  onUpdate: (id: number, payload: NotePayload) => Promise<void>;
  onCancelEdit: () => void;
}

const NoteForm = ({
  categories,
  editingNote,
  onCreate,
  onUpdate,
  onCancelEdit,
}: Props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState<number | undefined>();

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
      setCategoryId(editingNote.category?.id);
    } else {
      setTitle("");
      setContent("");
      setCategoryId(undefined);
    }
  }, [editingNote]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = { title, content, categoryId };

    if (editingNote) {
      await onUpdate(editingNote.id, payload);
    } else {
      await onCreate(payload);
    }

    setTitle("");
    setContent("");
    setCategoryId(undefined);
  };

  return (
    <form className="form note-form" onSubmit={handleSubmit}>
      <div className="note-form__field">
        <input
          className="form-control"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="note-form__field">
        <textarea
          className="form-control"
          placeholder="Contenido"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>

      <div className="note-form__field">
        <select
          className="form-select"
          value={categoryId ?? ""}
          onChange={(e) =>
            setCategoryId(e.target.value ? Number(e.target.value) : undefined)
          }
        >
          <option value="">Sin categoría</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="note-form__actions">
        <button type="submit" className="btn btn-primary">
          {editingNote ? "Actualizar" : "Crear nota"}
        </button>

        {editingNote && (
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={onCancelEdit}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default NoteForm;
