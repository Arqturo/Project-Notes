import { Category } from "../categories/category.entity";
export declare class Note {
    id: number;
    title: string;
    content: string;
    isArchived: boolean;
    categories: Category[];
    createdAt: Date;
}
