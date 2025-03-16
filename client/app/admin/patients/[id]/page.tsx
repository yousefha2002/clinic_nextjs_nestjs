import ShadowParent from '@/components/ui/ShadowParent';
import AppointmentsList from '@/components/user-profile/AppointmentsList';
import TransactionsList from '@/components/user-profile/TransactionsList';
import UserCard from '@/components/user-profile/UserCard';
import { getAppointmentsByUser } from '@/lib/appointments';
import { getTransactionsByPateint } from '@/lib/transactions';
import { getUser } from '@/lib/user';
import { AppointmentStatus } from '@/utils/enums/appointment-status';
import { PaymentStatus } from '@/utils/enums/payment-status';
import React from 'react'

export default async function page({ params }: { params: Promise<{ id: number }> }) {
    const {id} = await params
    const [user,appointments,transactions] = await Promise.all([
            getUser(id),
            getAppointmentsByUser(id),
            getTransactionsByPateint(id)
    ])
    return (
        <ShadowParent classStyle="max-w-3xl mx-auto">
            <UserCard 
                image={user.image} 
                name={user.username}
                email={user.email} 
                department={user.department?.name}
                birthdate={user.birthdate} 
            />
            <AppointmentsList isDoctor={false} appointments={appointments.map((appointment) => ({
            ...appointment,status: appointment.status as AppointmentStatus}))}/>
            <TransactionsList transactions={transactions.map((transaction) => ({
            ...transaction,status: transaction.status as PaymentStatus}))}/>
        </ShadowParent>
    )
}