import React from 'react'
import Table from '@/components/table/Table'
import Header from '@/components/table/Header'
import TableData from '@/components/table/TableData'
import ShadowParent from '@/components/ui/ShadowParent'
import { Transaction } from '@/types/Transaction'
import formatDate from '@/utils/formatDate'

export default function LastTransactions({transactions}:{transactions:Transaction[]}) {
    const headerRows = ["id","Pateint","Fee","Time"]
    return (
        <ShadowParent>
            <h3 className='mb-4 font-semibold text-[18px]'>Last Transactions</h3>
            <Table>
                <Header rows={headerRows}/>
                <tbody>
                    {transactions.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
                        <TableData >{item.id}</TableData>
                        <TableData >{item.patient?.username}</TableData>
                        <TableData >{item.fee}</TableData>
                        <TableData >{formatDate(item.createdAt)}</TableData>
                    </tr>
                ))}
                </tbody>
            </Table>
        </ShadowParent>
    )
}