import { IsDate, IsNotEmpty, IsString, Validate } from "class-validator";
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { Transform } from "class-transformer";

@ValidatorConstraint({ async: false })
export class IsInTheFuture implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
        const date = new Date(value);
        return date > new Date();
    }
    defaultMessage(args: ValidationArguments) {
        return 'appointment date should be in future';
    }
}

export class createAppointemntDto{
    @IsString()
    @IsNotEmpty()
    note:string;

    @IsString()
    doctorId:string;

    @IsString()
    patientId:string;

    @IsDate()
    @Transform(({ value }) => new Date(value))
    @Validate(IsInTheFuture)
    date:Date
}