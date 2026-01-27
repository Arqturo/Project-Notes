import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
} from "typeorm";

import { Category } from "../categories/category.entity";

@Entity("notes")
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column("text", { nullable: true })
  content: string;

  @Column({ default: false })
  isArchived: boolean;

  @ManyToMany(() => Category, (category) => category.notes, {
    eager: true,
  })
  @JoinTable()
  categories: Category[];

  @CreateDateColumn()
  createdAt: Date;
}
