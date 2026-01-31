import { useEffect, useState } from "react";

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

import type { Note } from "../types/note";
import type { Category } from "../types/category";

import NoteForm from "../components/notes/NoteForm";
import NoteCard from "../components/notes/NoteCard";
import NotesTabs from "../components/notes/NotesTabs";

const NotesPage = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [archivedNotes, setArchivedNotes] = useState<Note[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [activeTab, setActiveTab] = useState<"active" | "archived">("active");

  useEffect(() => {
    const load = async () => {
      const [active, archived, cats] = await Promise.all([
        getActiveNotes(),
        getArchivedNotes(),
        getCategories(),
      ]);

      setNotes(active);
      setArchivedNotes(archived);
      setCategories(cats);
    };

    load();
  }, []);

  const handleCreate = async (payload: {
    title: string;
    content: string;
    categoryId?: number;
  }) => {
    const note = await createNote(payload);
    setNotes((prev) => [note, ...prev]);
  };

  const handleUpdate = async (
    id: number,
    payload: {
      title: string;
      content: string;
      categoryId?: number;
    },
  ) => {
    const updated = await updateNote(id, payload);

    setNotes((prev) => prev.map((n) => (n.id === id ? updated : n)));

    setArchivedNotes((prev) => prev.map((n) => (n.id === id ? updated : n)));

    setEditingNote(null);
  };

  const handleDelete = async (id: number) => {
    await deleteNote(id);
    setNotes((prev) => prev.filter((n) => n.id !== id));
    setArchivedNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const handleArchive = async (id: number) => {
    const updated = await archiveNote(id);
    setNotes((prev) => prev.filter((n) => n.id !== id));
    setArchivedNotes((prev) => [updated, ...prev]);
  };

  const handleUnarchive = async (id: number) => {
    const updated = await unarchiveNote(id);
    setArchivedNotes((prev) => prev.filter((n) => n.id !== id));
    setNotes((prev) => [updated, ...prev]);
  };

  return (
    <div className="container py-4">
      <NotesTabs active={activeTab} onChange={setActiveTab} />

      <NoteForm
        categories={categories}
        editingNote={editingNote}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onCancelEdit={() => setEditingNote(null)}
      />

      <div className="task-list row g-3 mt-3">
        {(activeTab === "active" ? notes : archivedNotes).map((note) => (
          <div className="col-md-4" key={note.id}>
            <NoteCard
              note={note}
              activeTab={activeTab}
              onEdit={() => setEditingNote(note)}
              onDelete={() => handleDelete(note.id)}
              onArchive={() => handleArchive(note.id)}
              onUnarchive={() => handleUnarchive(note.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesPage;
