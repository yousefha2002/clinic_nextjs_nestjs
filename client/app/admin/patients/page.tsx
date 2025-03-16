import UserTable from '@/components/admin/user/UserTable'
import { getUsers } from '@/lib/user'
import { roles } from '@/utils/enums/roles'
import React from 'react'

export default async function page() {
    const patients = await getUsers(roles.Patient)
    return (
        <UserTable role={roles.Patient} data={patients}/>
    )
}
