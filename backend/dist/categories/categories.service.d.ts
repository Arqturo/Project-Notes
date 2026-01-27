import { Repository } from "typeorm";
import { Category } from "./category.entity";
export declare class CategoriesService {
    private readonly categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    create(name: string): Promise<Category>;
    findAll(): Promise<Category[]>;
    findByName(name: string): Promise<Category | null>;
}
