import ChangeEmailForm from '@/components/auth/ChangeEmailForm'
import { getUserProfile } from '@/lib/user'
import React from 'react'

export default async function page() {
    const user = await getUserProfile()
    return (
        <ChangeEmailForm isAdmin={false} email={user.email}/>
    )
}
