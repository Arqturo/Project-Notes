import { useEffect, useState, useCallback } from "react";

import type { Note } from "../types/note";
import type { Category } from "../types/category";

import {
  getActiveNotes,
  getArchivedNotes,
  createNote,
  updateNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
} from "../api/notes.api";

import { getCategories } from "../api/categories.api";

import "../styles/notes.css";

function NotesPage() {
  // ======================
  // STATE
  // ======================

  const [notes, setNotes] = useState<Note[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showArchived, setShowArchived] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");

  const [editingNote, setEditingNote] = useState<Note | null>(null);

  // ======================
  // LOADERS
  // ======================

  const loadNotes = useCallback(async () => {
    const data = showArchived
      ? await getArchivedNotes()
      : await getActiveNotes();

    setNotes(data);
  }, [showArchived]);

  const loadCategories = useCallback(async () => {
    const data = await getCategories();
    setCategories(data);
  }, []);

  // ======================
  // EFFECTS (SIN ERRORES)
  // ======================

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  // ======================
  // CREATE / UPDATE
  // ======================

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title,
      content,
      categoryId: categoryId === "" ? undefined : categoryId,
    };

    if (editingNote) {
      await updateNote(editingNote.id, payload);
    } else {
      await createNote(payload);
    }

    setTitle("");
    setContent("");
    setCategoryId("");
    setEditingNote(null);

    await loadNotes();
  };

  // ======================
  // ACTIONS
  // ======================

  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);

    setCategoryId(note.categories?.[0]?.id ?? "");
  };

  const handleDelete = async (id: number) => {
    await deleteNote(id);
    await loadNotes();
  };

  const handleArchive = async (id: number) => {
    await archiveNote(id);
    await loadNotes();
  };

  const handleUnarchive = async (id: number) => {
    await unarchiveNote(id);
    await loadNotes();
  };

  // ======================
  // RENDER
  // ======================

  return (
    <div className="notes-container">
      <h1 className="title">📝 Notes App</h1>

      {/* TABS */}
      <div className="tabs">
        <button
          className={!showArchived ? "tab active" : "tab"}
          onClick={() => setShowArchived(false)}
        >
          Active Notes
        </button>

        <button
          className={showArchived ? "tab active" : "tab"}
          onClick={() => setShowArchived(true)}
        >
          Archived Notes
        </button>
      </div>

      {/* FORM */}
      {!showArchived && (
        <form className="note-form" onSubmit={handleSubmit}>
          <input
            className="form-control"
            placeholder="Title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="form-control"
            placeholder="Content"
            value={content}
            required
            onChange={(e) => setContent(e.target.value)}
          />

          <select
            value={categoryId}
            onChange={(e) =>
              setCategoryId(e.target.value === "" ? "" : Number(e.target.value))
            }
          >
            <option value="">Sin categoría</option>

            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <button className="btn btn-primary" type="submit">
            {editingNote ? "Update note" : "Create note"}
          </button>
        </form>
      )}

      {/* NOTES */}
      <div className="notes-grid">
        {notes.map((note) => (
          <div key={note.id} className="note-card">
            <h3>{note.title}</h3>
            <p>{note.content}</p>

            <div className="tags">
              <div>
                {note.categories.map((cat) => (
                  <span key={cat.id} className="tag">
                    #{cat.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="actions">
              {!note.isArchived && (
                <>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleEdit(note)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-warning"
                    onClick={() => handleArchive(note.id)}
                  >
                    Archive
                  </button>
                </>
              )}

              {note.isArchived && (
                <button
                  className="btn btn-success"
                  onClick={() => handleUnarchive(note.id)}
                >
                  Unarchive
                </button>
              )}

              <button
                className="btn btn-danger"
                onClick={() => handleDelete(note.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotesPage;
