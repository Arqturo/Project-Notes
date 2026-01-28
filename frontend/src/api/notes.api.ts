import { api } from "./axios";
import type { Note } from "../types/note";

interface NotePayload {
  title: string;
  content: string;
  categoryId?: number;
}

export const getActiveNotes = async (): Promise<Note[]> => {
  const res = await api.get("/notes/active");
  return res.data;
};

export const getArchivedNotes = async (): Promise<Note[]> => {
  const res = await api.get("/notes/archived");
  return res.data;
};

export const createNote = (data: NotePayload) => api.post("/notes", data);

export const updateNote = (id: number, data: NotePayload) =>
  api.put(`/notes/${id}`, data);

export const deleteNote = (id: number) => api.delete(`/notes/${id}`);

export const archiveNote = (id: number) => api.patch(`/notes/${id}/archive`);

export const unarchiveNote = (id: number) =>
  api.patch(`/notes/${id}/unarchive`);
