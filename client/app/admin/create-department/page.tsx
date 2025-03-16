'use client'
import { createDepartment } from '@/actions/department/createDepartment';
import ErrorMessage from '@/components/ui/ErrorMessage';
import InputField from '@/components/ui/InputField'
import SubmitButton from '@/components/ui/SubmitButton';
import React, { useActionState } from 'react'
import {FiBriefcase} from "react-icons/fi"; 

export default function page() {
    const [state,action,isPending] = useActionState(createDepartment,null)
    return (
        <form action={action}>
            <div className='mb-3'>
                <InputField
                    type='text'
                    required={true}
                    name="name"
                    placeholder="Name"
                    icon={FiBriefcase}
                />
            </div>
            <ErrorMessage>{state?.error}</ErrorMessage>
            <SubmitButton isPending={isPending}>Save</SubmitButton>
        </form>
    )
}
