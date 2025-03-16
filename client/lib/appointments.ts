import { Appointment } from "@/types/Appointment";
import { apiGet } from "@/utils/apiGet";
import { getUserToken } from "./auth";

export function getAppointments()
{
    return apiGet<Appointment[]>(`${process.env.API}appointment`);
}

export function getDailyAppointments()
{
    return apiGet<Appointment[]>(`${process.env.API}appointment/daily`);
}

export function getAppointment(id:number)
{
    return apiGet<Appointment>(`${process.env.API}appointment/${id}`);
}

export function getAppointmentsByUser(userId:number)
{
    return apiGet<Appointment[]>(`${process.env.API}appointment/all/${userId}`);
}

export async function getUserAppointments()
{
    const token = await getUserToken()
    const tokenValue = token ? token.value : undefined;
    return apiGet<Appointment[]>(`${process.env.API}appointment/all/mine`,tokenValue);
}