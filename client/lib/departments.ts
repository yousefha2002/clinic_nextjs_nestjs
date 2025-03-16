import { Department } from "@/types/Department";
import { apiGet } from "@/utils/apiGet";

export function getDepartments()
{
    return apiGet<Department[]>(`${process.env.API}department`);
}

export function getDepartment(id:number)
{
    return apiGet<Department>(`${process.env.API}department/${id}`);
}