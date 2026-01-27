import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
export declare class CategoriesController {
    private readonly service;
    constructor(service: CategoriesService);
    create(dto: CreateCategoryDto): Promise<import("./category.entity").Category>;
    findAll(): Promise<import("./category.entity").Category[]>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
