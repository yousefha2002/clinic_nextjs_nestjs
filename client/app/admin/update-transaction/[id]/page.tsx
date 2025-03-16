import UpdateTransactionForm from '@/components/admin/transaction/UpdateTransactionForm';
import { getTransaction } from '@/lib/transactions';
import React from 'react'

export default async function page({params}:{params:Promise<{id:number}>}) {
    const {id} = await params
    const transaction  = await getTransaction(id)
    return (
        <>
            <UpdateTransactionForm transaction={transaction} id={id}/>
        </>
    )
}