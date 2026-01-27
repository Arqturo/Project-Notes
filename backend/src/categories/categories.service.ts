import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Category } from "./category.entity";
import { CreateCategoryDto } from "./dto/create-category.dto";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  // ======================
  // CREATE
  // ======================
  async create(dto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create({
      name: dto.name,
    });

    return this.categoryRepository.save(category);
  }

  // ======================
  // READ
  // ======================
  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find({
      order: { id: "ASC" },
    });
  }

  // ======================
  // DELETE
  // ======================
  async remove(id: number): Promise<{ deleted: boolean }> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ["notes"],
    });

    if (!category) {
      throw new NotFoundException("Category not found");
    }

    // evita borrar categorías que tengan notas
    if (category.notes.length > 0) {
      throw new Error("Cannot delete category because it is assigned to notes");
    }

    await this.categoryRepository.delete(id);

    return { deleted: true };
  }
}
