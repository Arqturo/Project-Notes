import type { Note } from "../../types/note";

interface Props {
  note: Note;
  activeTab: "active" | "archived";
  onEdit: () => void;
  onDelete: () => void;
  onArchive?: () => void;
  onUnarchive?: () => void;
}

const NoteCard = ({
  note,
  onEdit,
  onDelete,
  onArchive,
  onUnarchive,
  activeTab,
}: Props) => {
  return (
    <div className="note-card">
      <div className="note-card__body">
        {/* HEADER */}
        <div className="note-card__header">
          <h5 className="note-card__title">{note.title}</h5>

          {note.category && (
            <span className="note-card__category">{note.category.name}</span>
          )}
        </div>

        {/* CONTENT */}
        <p className="note-card__content">
          {note.content.length > 120
            ? note.content.slice(0, 120) + "…"
            : note.content}
        </p>

        {/* ACTIONS */}
        <div className="note-card__actions">
          <div className="note-card__actions-left">
            <button
              type="button"
              className="edit-btn btn btn-sm btn-outline-primary"
              onClick={onEdit}
            >
              ✏️ Editar
            </button>

            {activeTab === "active" && (
              <button
                type="button"
                className="second-btn btn btn-sm btn-outline-secondary"
                onClick={onArchive}
              >
                📦 Archivar
              </button>
            )}

            {activeTab === "archived" && (
              <button
                type="button"
                className="second-btn btn btn-sm btn-outline-success"
                onClick={onUnarchive}
              >
                ♻️ Restaurar
              </button>
            )}

            <button
              type="button"
              className="delete-btn btn btn-sm btn-outline-danger"
              onClick={onDelete}
            >
              🗑 Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
