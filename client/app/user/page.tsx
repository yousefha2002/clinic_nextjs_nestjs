import ShadowParent from '@/components/ui/ShadowParent';
import UserCard from '@/components/user-profile/UserCard';
import { getUserProfile } from '@/lib/user';
import React from 'react'

export default async function page() {
    const user = await getUserProfile()
    return (
        <ShadowParent classStyle='max-w-3xl mx-auto'>
            <UserCard
                image={user.image} 
                name={user.username}
                email={user.email} 
                department={user.department?.name}
                birthdate={user.birthdate} 
            />
        </ShadowParent>
    )
}