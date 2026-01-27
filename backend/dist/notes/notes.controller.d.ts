import { NotesService } from "./notes.service";
import { CreateNoteDto } from "./dto/create-note.dto";
import { UpdateNoteDto } from "./dto/update-note.dto";
import { Note } from "./note.entity";
export declare class NotesController {
    private readonly notesService;
    constructor(notesService: NotesService);
    create(dto: CreateNoteDto): Promise<Note>;
    findActive(): Promise<Note[]>;
    findArchived(): Promise<Note[]>;
    update(id: string, dto: UpdateNoteDto): Promise<Note>;
    archive(id: string): Promise<Note>;
    unarchive(id: string): Promise<Note>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
