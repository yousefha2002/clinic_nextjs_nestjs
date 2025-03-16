import {IsNumber, IsOptional, IsString, Min } from "class-validator";
export class updatePaymentDto {
    @IsNumber()
    @Min(1)
    @IsOptional()
    fee:number

    @IsString()
    @IsOptional()
    note:string
}