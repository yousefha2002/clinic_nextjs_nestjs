import ChangeEmailForm from '@/components/auth/ChangeEmailForm'
import { getAdmin } from '@/lib/admin'
import React from 'react'

export default async function page() {
    const admin = await getAdmin()
    return (
        <ChangeEmailForm isAdmin={true} email={admin.email}/>
    )
}
