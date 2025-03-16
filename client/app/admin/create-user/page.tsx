import CreateUserForm from '@/components/admin/user/createUserForm'
import { getDepartments } from '@/lib/departments'
import React from 'react'

export default async function page() {
    const departments = await getDepartments() 
    return (
        <>
            <CreateUserForm
                departments = {departments.map(item => ({ id: item.id, name: item.name })) }
            />
        </>
    )
}
