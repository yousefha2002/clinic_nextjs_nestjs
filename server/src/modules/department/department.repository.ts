import { repositories } from "src/common/enums/repositories";
import { Department } from "./entities/department.entity";

export const DepartmentProvider = [
    {
        provide: repositories.department_repository,
        useValue: Department,
    },
];