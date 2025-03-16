import { Transform } from 'class-transformer';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, IsDate, Validate } from 'class-validator';

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
export class updateAppointemntDto {
    @IsDate()
    @Transform(({ value }) => new Date(value))
    @Validate(IsInTheFuture)
    date:Date
}