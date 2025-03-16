'use client'
import React, { useActionState } from 'react'
import { changeEmail as changeAdminEmail } from '@/actions/admin/changeEmail';
import { changeEmail as changeUserEmail } from '@/actions/user/changEmail';
import InputField from '../ui/InputField';
import {FiMail } from "react-icons/fi"; 
import ErrorMessage from '../ui/ErrorMessage';
import SubmitButton from '../ui/SubmitButton';

export default function ChangeEmailForm({email,isAdmin}:{email:string,isAdmin:boolean}) {
    const [state,action,isPending] = useActionState(isAdmin?changeAdminEmail:changeUserEmail,null)
    return (
        <form action={action}>
            <InputField
                type='email'
                required={true}
                name="newEmail"
                placeholder="Email"
                icon={FiMail}
                defaultValue={email}
            />
            <ErrorMessage>{state?.error}</ErrorMessage>
            <SubmitButton isPending={isPending}>Change Email</SubmitButton>
        </form>
    )
}
