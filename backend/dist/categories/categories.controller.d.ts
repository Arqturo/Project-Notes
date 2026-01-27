import { CategoriesService } from "./categories.service";
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(name: string): Promise<import("./category.entity").Category>;
    findAll(): Promise<import("./category.entity").Category[]>;
}
