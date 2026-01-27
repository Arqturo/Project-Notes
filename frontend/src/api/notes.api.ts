import { api } from "./axios";
import type { Note } from "../types/note";

export const getNotes = async (): Promise<Note[]> => {
  const res = await api.get("/notes");
  return res.data;
};

export const getActiveNotes = async (): Promise<Note[]> => {
  const res = await api.get("/notes/active");
  return res.data;
};

export const getArchivedNotes = async (): Promise<Note[]> => {
  const res = await api.get("/notes/archived");
  return res.data;
};

export const createNote = (data: {
  title: string;
  content: string;
  categoryId?: number;
}) => {
  return api.post("/notes", data);
};

export const updateNote = (
  id: number,
  data: {
    title: string;
    content: string;
    categoryId?: number;
  },
) => {
  return api.put(`/notes/${id}`, data);
};

export const archiveNote = (id: number) => {
  return api.patch(`/notes/${id}/archive`);
};

export const unarchiveNote = (id: number) => {
  return api.patch(`/notes/${id}/unarchive`);
};

export const deleteNote = (id: number) => {
  return api.delete(`/notes/${id}`);
};
