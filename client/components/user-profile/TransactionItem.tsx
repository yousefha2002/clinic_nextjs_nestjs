import { Transaction } from '@/types/Transaction'
import { PaymentStatus } from '@/utils/enums/payment-status'
import formatDate from '@/utils/formatDate'
import React from 'react'

export default function TransactionItem({transaction}:{transaction:Transaction}) {
    return (
        <div key={transaction.id} className="mb-3 p-3 bg-white lg:flex-row flex-col rounded-md shadow flex justify-between lg:items-center">
            <p className="flex items-center text-gray-700">
                <strong>Amount:</strong> ${transaction.fee}
            </p>
            <p className="text-gray-700"><strong>Note:</strong> {transaction.note}</p>
            <p className={`text-sm font-semibold ${transaction.status === PaymentStatus.paid ? "text-success" : "text-error"}`}>
                {transaction.status}
            </p>
            <p className="text-gray-500 text-sm">{formatDate(transaction.createdAt)}</p>
        </div>
    )
}
