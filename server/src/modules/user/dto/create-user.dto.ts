import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Validate } from "class-validator";
import { UserRole } from "src/common/enums/roles";
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsNotInTheFuture implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
        const date = new Date(value);
        return date <= new Date();
    }
    defaultMessage(args: ValidationArguments) {
        return 'Birthdate cannot be in the future';
    }
}

export class createUserDto {
    @IsEmail()
    @IsString()
    email:string

    @IsString()
    @IsNotEmpty()
    password:string

    @IsNotEmpty()
    @IsString()
    username:string

    @IsEnum(UserRole)
    role:UserRole

    @IsOptional()
    @IsString()
    departmentId:string

    @IsDateString()
    @Validate(IsNotInTheFuture)
    birthdate:string
}