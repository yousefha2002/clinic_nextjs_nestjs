import UserTable from '@/components/admin/user/UserTable'
import { getUsers } from '@/lib/user'
import { roles } from '@/utils/enums/roles'
import React from 'react'

export default async function page() {
    const doctors = await getUsers(roles.Doctor)
    return (
        <UserTable role={roles.Doctor} data={doctors}/>
    )
}
