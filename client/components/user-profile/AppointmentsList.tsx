import React from "react";
import { Appointment } from "@/types/Appointment";
import AppointmentItem from "./AppointmentItem";

export default function AppointmentsList({ appointments,isDoctor }: {appointments:Appointment[],isDoctor:boolean}) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Appointments</h2>
      <div className="bg-gray-100 p-4 rounded-md">
        {
        appointments.length>0?
        appointments.map((appointment) => (
          <AppointmentItem isDoctor={isDoctor} appointment={appointment} key={appointment.id}/>
        ))
        :
        <h3 className="text-error font-semibold">There is no appointment</h3>
        }
      </div>
    </div>
  );
}