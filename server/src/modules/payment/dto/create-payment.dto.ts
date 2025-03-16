import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { paymentStatus } from "src/common/enums/paymentStatus";

export class createPaymentDto {
    @IsNumber()
    @Min(1)
    fee:number

    @IsString()
    @IsNotEmpty()
    note:string

    @IsString()
    patientId:string

    @IsEnum(paymentStatus)
    status:paymentStatus
}