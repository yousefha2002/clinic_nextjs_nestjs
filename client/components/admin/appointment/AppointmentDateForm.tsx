'use client'
import { updateAppointmentDate } from '@/actions/appointment/updateAppointmentDate';
import ErrorMessage from '@/components/ui/ErrorMessage';
import InputField from '@/components/ui/InputField'
import SubmitButton from '@/components/ui/SubmitButton'
import React, { useActionState } from 'react'
import { FiCalendar } from "react-icons/fi";

export default function AppointmentDateForm({date,id}:{date:string,id:number}) {
    const [state,action,isPending] = useActionState(updateAppointmentDate,null)
    return (
        <form className="mb-4" action={action}>
            <InputField
                type="datetime-local"
                required={true}
                name="date"
                placeholder="Update Date & Time"
                icon={FiCalendar}
                defaultValue={date}
            />
            <input type="hidden" name="id" value={id} />
            <ErrorMessage>{state?.error}</ErrorMessage>
            <SubmitButton isPending={isPending}>Save Date</SubmitButton>
        </form>
    )
}
