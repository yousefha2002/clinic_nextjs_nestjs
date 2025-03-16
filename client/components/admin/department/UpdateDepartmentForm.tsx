'use client'
import { updateDepartment } from '@/actions/department/updateDepartment';
import ErrorMessage from '@/components/ui/ErrorMessage';
import InputField from '@/components/ui/InputField'
import SubmitButton from '@/components/ui/SubmitButton';
import React, { useActionState } from 'react'
import {FiBriefcase} from "react-icons/fi"; 

export default function UpdateDepartmentForm({name,id}:{name:string,id:number}) {
    const [state,action,isPending] = useActionState(updateDepartment,null)
    return (
        <form action={action}>
            <div className='mb-3'>
                <InputField
                    type='text'
                    defaultValue={name}
                    required={true}
                    name="name"
                    placeholder="Name"
                    icon={FiBriefcase}
                />
                <input type="hidden" name="id" value={id} />
            </div>
            <ErrorMessage>{state?.error}</ErrorMessage>
            <SubmitButton isPending={isPending}>Update</SubmitButton>
        </form>
    )
}
