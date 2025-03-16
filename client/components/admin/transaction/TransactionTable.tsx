'use client'
import React, { startTransition, useOptimistic } from 'react'
import ShadowParent from '@/components//ui/ShadowParent'
import Header from '@/components/table/Header'
import Table from '@/components/table/Table'
import TableData from '@/components/table/TableData'
import UpdateAction from '@/components/ui/UpdateAction'
import DeleteAction from '@/components/ui/DeleteAction'
import Status from '@/components/ui/Status'
import { PaymentStatus } from '@/utils/enums/payment-status'
import { Transaction } from '@/types/Transaction'
import formatDate from '@/utils/formatDate'
import { deleteTransaction } from '@/actions/transaction/deleteTransaction'

export default function TransactionTable({transactions}:{transactions:Transaction[]}) {
    const headerRows = ['ID','Patient',"fee",'Date',"Status","Actions","Note"]
    const [optimisticTransactions, setOptimisticTransactions] = useOptimistic(
        transactions,
        (currentTransactions, id: number) => {
            return currentTransactions.filter(transaction => transaction.id !== id);
        }
    );

    const handleDelete = async(id: number) => {
        startTransition(() => {
            setOptimisticTransactions(id);
        });
        await deleteTransaction(id)
    };
    return (
            <ShadowParent>
                <Table>
                    <Header rows={headerRows}/>
                    <tbody>
                    {optimisticTransactions.map((item) => (
                        <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
                            <TableData >{item.id}</TableData>
                            <TableData >{item.patient?.username}</TableData>
                            <TableData >{item.fee}</TableData>
                            <TableData >{formatDate(item.createdAt)}</TableData>
                            <TableData ><Status status={item.status as PaymentStatus}/></TableData>
                            <TableData classes="flex gap-x-2 items-center">
                                <UpdateAction href={`/admin/update-transaction/${item.id}`}/>
                                <DeleteAction handleDelete={()=>handleDelete(item.id)}/>
                            </TableData>
                            <TableData >{item.note}</TableData>
                    </tr>
                    ))}
                    </tbody>
                </Table>
            </ShadowParent>
    )
}