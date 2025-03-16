'use client'
import { changePassword as changeAdminPassword } from '@/actions/admin/changePassword'
import { changePassword as changeUserPassword } from '@/actions/user/changePassword'
import React, { useActionState } from 'react'
import {FiLock } from "react-icons/fi"; 
import InputField from '../ui/InputField';
import ErrorMessage from '../ui/ErrorMessage';
import SubmitButton from '../ui/SubmitButton';

export default function ChangePasswordForm({isAdmin}:{isAdmin:boolean}) {
    const [state,action,isPending] = useActionState(isAdmin?changeAdminPassword:changeUserPassword,null)
    return (
        <form action={action}>
            <div className='mb-3'>
                <InputField
                    type='password'
                    required={true}
                    name="oldPassword"
                    placeholder="Old Password"
                    icon={FiLock}
                />
                </div>
                    <InputField 
                        type='password'
                        required={true}
                        name="newPassword"
                        placeholder="New Password"
                        icon={FiLock}
                    />
                <ErrorMessage>{state?.error}</ErrorMessage>
                <SubmitButton isPending={isPending}>Change Password</SubmitButton>
            </form>
    )
}
