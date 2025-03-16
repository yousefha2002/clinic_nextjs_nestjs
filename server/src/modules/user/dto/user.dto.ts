import { Expose, Type } from "class-transformer";
import { departmentDto } from "src/modules/department/dto/department.dto";

export class UserDto {
    @Expose()
    id:string;

    @Expose()
    email:string;

    @Expose()
    image:string;

    @Expose()
    username:string;

    @Expose()
    birthdate:string;
    
    @Expose()
    role:string;

    @Expose()
    @Type(() => departmentDto)
    department:departmentDto
}