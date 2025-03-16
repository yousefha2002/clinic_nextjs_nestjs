import TransactionsList from '@/components/user-profile/TransactionsList'
import { getPatientTransactions } from '@/lib/transactions'
import { PaymentStatus } from '@/utils/enums/payment-status'
import React from 'react'

export default async function page() {
    const transactions = await getPatientTransactions()
    return (
        <TransactionsList transactions={transactions.map((transaction) => ({
        ...transaction,status: transaction.status as PaymentStatus}))}/>
    )
}