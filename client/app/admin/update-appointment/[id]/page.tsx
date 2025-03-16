import React from "react";
import { getAppointment } from "@/lib/appointments";
import AppointmentDateForm from "@/components/admin/appointment/AppointmentDateForm";
import AppointmentActions from "@/components/admin/appointment/AppointmentActions";

export default async function Page({ params }: { params: Promise<{ id: number }> }) {
    const { id } = await params;
    const appointment = await getAppointment(id)
    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Update Appointment</h2>            

            <AppointmentDateForm date={appointment.date} id={id}/>
            <AppointmentActions id={id}/>
        </div>
    );
}