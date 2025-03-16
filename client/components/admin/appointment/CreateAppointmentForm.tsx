'use client'
import { createAppointment } from '@/actions/appointment/ceateAppointment';
import ErrorMessage from '@/components/ui/ErrorMessage';
import InputField from '@/components/ui/InputField';
import Select from '@/components/ui/Select'
import SubmitButton from '@/components/ui/SubmitButton';
import TextAreaField from '@/components/ui/TextAreaField';
import { SelectProps } from '@/types/Select';
import React, { useActionState } from 'react'
import {FiUser,FiCalendar,FiBook} from "react-icons/fi"; 

type props = {
    doctors : SelectProps[],
    patients:SelectProps[]
}

export default function CreateAppointmentForm({doctors,patients}:props) {
    const [state,action,isPending] = useActionState(createAppointment,null)
    return (
        <form action={action}>
            <div className='mb-3'>
                <Select
                    name='doctorId' 
                    items={doctors}
                    icon={FiUser}/>
            </div>
            <div className='mb-3'>
                <Select
                    name='patientId' 
                    items={patients}
                    icon={FiUser}/>
            </div>
            <div className='mb-3'>
                <InputField
                    type='datetime-local'
                    required={true}
                    name="date"
                    placeholder="Time"
                    icon={FiCalendar}
                />
            </div>
            <div className='mb-3'>
                <TextAreaField
                    name='note'
                    placeholder='Note'
                    required={true}
                    icon={FiBook}/>
            </div>
            <ErrorMessage>{state?.error}</ErrorMessage>
            <SubmitButton isPending={isPending}>Create</SubmitButton>
        </form>
    )
}
