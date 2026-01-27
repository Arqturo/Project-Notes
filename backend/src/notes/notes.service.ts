import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Note } from "./note.entity";
import { Category } from "../categories/category.entity";

import { CreateNoteDto } from "./dto/create-note.dto";
import { UpdateNoteDto } from "./dto/update-note.dto";

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(dto: CreateNoteDto) {
    const note = this.noteRepository.create({
      title: dto.title,
      content: dto.content,
      isArchived: false,
    });

    if (dto.categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: dto.categoryId },
      });

      if (category) {
        note.categories = [category];
      }
    }

    return this.noteRepository.save(note);
  }

  findActive() {
    return this.noteRepository.find({
      where: { isArchived: false },
      order: { createdAt: "DESC" },
    });
  }

  findArchived() {
    return this.noteRepository.find({
      where: { isArchived: true },
      order: { createdAt: "DESC" },
    });
  }

  async update(id: number, dto: UpdateNoteDto) {
    const note = await this.noteRepository.findOne({
      where: { id },
      relations: ["categories"],
    });

    if (!note) {
      throw new NotFoundException("Note not found");
    }

    if (dto.title !== undefined) {
      note.title = dto.title;
    }

    if (dto.content !== undefined) {
      note.content = dto.content;
    }

    if (dto.categoryId !== undefined) {
      if (dto.categoryId === null) {
        note.categories = [];
      } else {
        const category = await this.categoryRepository.findOne({
          where: { id: dto.categoryId },
        });

        note.categories = category ? [category] : [];
      }
    }

    return this.noteRepository.save(note);
  }

  async archive(id: number): Promise<Note> {
    const note = await this.noteRepository.findOne({
      where: { id },
    });

    if (!note) {
      throw new NotFoundException("Note not found");
    }

    note.isArchived = true;
    return this.noteRepository.save(note);
  }

  async unarchive(id: number): Promise<Note> {
    const note = await this.noteRepository.findOne({
      where: { id },
    });

    if (!note) {
      throw new NotFoundException("Note not found");
    }

    note.isArchived = false;
    return this.noteRepository.save(note);
  }

  async remove(id: number) {
    const result = await this.noteRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException("Note not found");
    }

    return { deleted: true };
  }
}
