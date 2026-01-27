import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Param,
  Body,
} from "@nestjs/common";

import { NotesService } from "./notes.service";
import { CreateNoteDto } from "./dto/create-note.dto";
import { UpdateNoteDto } from "./dto/update-note.dto";
import { Note } from "./note.entity";

@Controller("notes")
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() dto: CreateNoteDto): Promise<Note> {
    return this.notesService.create(dto);
  }

  @Get("active")
  findActive(): Promise<Note[]> {
    return this.notesService.findActive();
  }

  @Get("archived")
  findArchived(): Promise<Note[]> {
    return this.notesService.findArchived();
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateNoteDto): Promise<Note> {
    return this.notesService.update(Number(id), dto);
  }

  @Patch(":id/archive")
  archive(@Param("id") id: string): Promise<Note> {
    return this.notesService.archive(Number(id));
  }

  @Patch(":id/unarchive")
  unarchive(@Param("id") id: string): Promise<Note> {
    return this.notesService.unarchive(Number(id));
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<{ deleted: boolean }> {
    return this.notesService.remove(Number(id));
  }
}
