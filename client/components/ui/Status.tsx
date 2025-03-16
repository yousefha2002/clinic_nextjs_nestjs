import { AppointmentStatus } from '@/utils/enums/appointment-status'
import { PaymentStatus } from '@/utils/enums/payment-status'
import React from 'react'


export default function Status({status}:{status:AppointmentStatus|PaymentStatus}) {
    return (
        <div className={`
            ${(status===AppointmentStatus.pending||status===PaymentStatus.amount_due)&&'bg-upcoming'}
            ${status===AppointmentStatus.canceled&&'bg-error'}
            ${(status===AppointmentStatus.completed||status===PaymentStatus.paid)&&'bg-success'}
            text-white rounded-full px-3 py-1 w-fit
        `}>
            {status}
        </div>
    )
}
