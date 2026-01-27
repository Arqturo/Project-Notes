import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { NotesController } from "./notes.controller";
import { NotesService } from "./notes.service";
import { Note } from "./note.entity";

import { Category } from "../categories/category.entity";
import { CategoriesModule } from "../categories/categories.module";

@Module({
  imports: [TypeOrmModule.forFeature([Note, Category]), CategoriesModule],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
