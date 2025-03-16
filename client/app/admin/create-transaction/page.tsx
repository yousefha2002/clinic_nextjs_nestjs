import CreateTransactionForm from '@/components/admin/transaction/CreateTransactionForm'
import { getUsers } from '@/lib/user'
import { roles } from '@/utils/enums/roles'
import React from 'react'

export default async function page() {
    const patients = await getUsers(roles.Patient)
    return (
        <>
            <CreateTransactionForm
                patients={patients.map(item => ({ id: item.id, name: item.username }))}/>
        </>
    )
}
