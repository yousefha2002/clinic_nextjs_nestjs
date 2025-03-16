import { IsEnum } from "class-validator";
import { UserRole } from "src/common/enums/roles";

export class UserRoleDto {
    @IsEnum(UserRole)
    role:UserRole
}