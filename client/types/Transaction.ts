import { PaymentStatus } from "@/utils/enums/payment-status"

export interface Transaction {
    id:number,
    patient?:{
            username:string
    },
    createdAt:string,
    note:string,
    fee:number
    status:PaymentStatus
}