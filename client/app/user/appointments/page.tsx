import AppointmentsList from '@/components/user-profile/AppointmentsList'
import { getUserAppointments } from '@/lib/appointments'
import { getUserRole } from '@/lib/auth'
import { AppointmentStatus } from '@/utils/enums/appointment-status'
import { roles } from '@/utils/enums/roles'
import React from 'react'

export default async function appoinments() {
    const appointments = await getUserAppointments()
    const roleCookie = await getUserRole()
    const role = roleCookie?.value
    return (
        <>
            <AppointmentsList isDoctor={role===roles.Doctor?true:false} appointments={appointments.map((appointment) => ({
            ...appointment,status: appointment.status as AppointmentStatus}))}/>
        </>
    )
}