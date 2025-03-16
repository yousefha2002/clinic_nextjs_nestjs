import { Expose } from "class-transformer";

export class PaymentDto {
    
    @Expose()
    id:string
    
    @Expose()
    fee:string

    @Expose()
    note:string

    @Expose()
    status:string
}