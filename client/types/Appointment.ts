import { AppointmentStatus } from "@/utils/enums/appointment-status"

export interface Appointment {
    id:number,
    patient?:{
        username:string
    },
    doctor?:{
        username:string
    },
    patientId:number,
    doctorId:number,
    date:string,
    note:string,
    status:AppointmentStatus
}