import CreateAppointmentForm from '@/components/admin/appointment/CreateAppointmentForm'
import { getUsers } from '@/lib/user'
import { roles } from '@/utils/enums/roles'
import React from 'react'

export default async function page() {
    const doctors = await getUsers(roles.Doctor)
    const patients = await getUsers(roles.Patient)
    return (
        <>
            <CreateAppointmentForm
                doctors={doctors.map(item => ({ id: item.id, name: item.username }))}
                patients={patients.map(item => ({ id: item.id, name: item.username }))}
            />
        </>
    )
}
