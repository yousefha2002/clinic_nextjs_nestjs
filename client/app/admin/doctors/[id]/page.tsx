import AppointmentsList from '@/components/user-profile/AppointmentsList';
import UserCard from '@/components/user-profile/UserCard';
import { getAppointmentsByUser } from '@/lib/appointments';
import { getUser } from '@/lib/user';
import { User } from '@/types/User';
import { AppointmentStatus } from '@/utils/enums/appointment-status';
import React from 'react'

export default async function page({ params }: { params: Promise<{ id: number }> }) {
    const {id} = await params
    const [user,appointments] = await Promise.all([
        getUser(id),
        getAppointmentsByUser(id)
    ])
    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <UserCard 
                image={user.image} 
                name={user.username}
                email={user.email} 
                department={user.department?.name}
                birthdate={user.birthdate} 
            />
            <AppointmentsList isDoctor={true} appointments={appointments.map((appointment) => ({
            ...appointment,status: appointment.status as AppointmentStatus}))}/>
        </div>
    )
}