import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Validate } from "class-validator";
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
export class userInformationDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    username:string

    @IsOptional()
    @IsDateString()
    @Validate(IsNotInTheFuture)
    birthdate:string

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    image:string
}