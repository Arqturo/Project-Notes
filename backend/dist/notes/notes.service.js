"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const note_entity_1 = require("./note.entity");
const category_entity_1 = require("../categories/category.entity");
let NotesService = class NotesService {
    noteRepository;
    categoryRepository;
    constructor(noteRepository, categoryRepository) {
        this.noteRepository = noteRepository;
        this.categoryRepository = categoryRepository;
    }
    async create(dto) {
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
    async update(id, dto) {
        const note = await this.noteRepository.findOne({
            where: { id },
            relations: ["categories"],
        });
        if (!note) {
            throw new common_1.NotFoundException("Note not found");
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
            }
            else {
                const category = await this.categoryRepository.findOne({
                    where: { id: dto.categoryId },
                });
                note.categories = category ? [category] : [];
            }
        }
        return this.noteRepository.save(note);
    }
    async archive(id) {
        const note = await this.noteRepository.findOne({
            where: { id },
        });
        if (!note) {
            throw new common_1.NotFoundException("Note not found");
        }
        note.isArchived = true;
        return this.noteRepository.save(note);
    }
    async unarchive(id) {
        const note = await this.noteRepository.findOne({
            where: { id },
        });
        if (!note) {
            throw new common_1.NotFoundException("Note not found");
        }
        note.isArchived = false;
        return this.noteRepository.save(note);
    }
    async remove(id) {
        const result = await this.noteRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException("Note not found");
        }
        return { deleted: true };
    }
};
exports.NotesService = NotesService;
exports.NotesService = NotesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(note_entity_1.Note)),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], NotesService);
//# sourceMappingURL=notes.service.js.map