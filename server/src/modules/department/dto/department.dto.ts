import { Expose } from "class-transformer";

export class departmentDto {
    @Expose()
    id:number;

    @Expose()
    name:string;
}