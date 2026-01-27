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

function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showArchived, setShowArchived] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");

  const [editingNote, setEditingNote] = useState<Note | null>(null);

  /* ======================
     LOAD FUNCTIONS
  ====================== */

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

  /* ======================
     EFFECTS
  ====================== */

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  /* ======================
     CREATE / UPDATE
  ====================== */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

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

    loadNotes();
  };

  /* ======================
     ACTIONS
  ====================== */

  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
    setCategoryId(note.categories?.[0]?.id ?? "");
  };

  const handleDelete = async (id: number) => {
    await deleteNote(id);
    loadNotes();
  };

  const handleArchive = async (id: number) => {
    await archiveNote(id);
    loadNotes();
  };

  const handleUnarchive = async (id: number) => {
    await unarchiveNote(id);
    loadNotes();
  };

  /* ======================
     RENDER
  ====================== */

  return (
    <div className="container">
      <h1>📝 Notes App 📝</h1>

      {/* TABS */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button
          className={`btn ${!showArchived ? "btn-primary" : "btn-secondary"}`}
          onClick={() => setShowArchived(false)}
        >
          Active notes
        </button>

        <button
          className={`btn ${showArchived ? "btn-primary" : "btn-secondary"}`}
          onClick={() => setShowArchived(true)}
        >
          Archived notes
        </button>
      </div>

      {/* FORM */}
      {!showArchived && (
        <form className="form" onSubmit={handleSubmit}>
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <select
            value={categoryId}
            onChange={(e) =>
              setCategoryId(e.target.value === "" ? "" : Number(e.target.value))
            }
          >
            <option value="">No category</option>
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
      <div className="grid">
        {notes.map((note) => (
          <div key={note.id} className="card">
            <h3>{note.title}</h3>
            <p>{note.content}</p>

            <div style={{ marginBottom: "10px" }}>
              {note.categories?.map((cat) => (
                <span key={cat.id} className="badge">
                  {cat.name}
                </span>
              ))}
            </div>

            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {!note.isArchived && (
                <>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleEdit(note)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-primary"
                    onClick={() => handleArchive(note.id)}
                  >
                    Archive
                  </button>
                </>
              )}

              {note.isArchived && (
                <button
                  className="btn btn-secondary"
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
