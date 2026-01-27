import { Repository } from "typeorm";
import { Note } from "./note.entity";
import { Category } from "../categories/category.entity";
import { CreateNoteDto } from "./dto/create-note.dto";
import { UpdateNoteDto } from "./dto/update-note.dto";
export declare class NotesService {
    private readonly noteRepository;
    private readonly categoryRepository;
    constructor(noteRepository: Repository<Note>, categoryRepository: Repository<Category>);
    create(dto: CreateNoteDto): Promise<Note>;
    findActive(): Promise<Note[]>;
    findArchived(): Promise<Note[]>;
    findOne(id: number): Promise<Note>;
    update(id: number, dto: UpdateNoteDto): Promise<Note>;
    archive(id: number): Promise<Note>;
    unarchive(id: number): Promise<Note>;
    remove(id: number): Promise<{
        deleted: boolean;
    }>;
}
