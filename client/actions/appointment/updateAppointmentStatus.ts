"use server";
import { getAdminAuth } from "@/lib/auth";
import { apiPost } from "@/utils/apiPost";
import { AppointmentStatus } from "@/utils/enums/appointment-status";
import { handleApiError } from "@/utils/handleApiError";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateAppoinmentStatus(id:number,status:AppointmentStatus.completed|AppointmentStatus.canceled){
    const token = await getAdminAuth()
    const tokenValue = token ? token.value : undefined;
    // Call the API to attempt login
    const response = await apiPost(
        `${process.env.API}appointment/${status===AppointmentStatus.completed?'complete':'cancel'}/${id}`,
        "PATCH",{},
        tokenValue
    );

    // If API returns errors, handle them
    if (response.message) {
        return { error: handleApiError(response) };
    }
    revalidatePath('/','layout')
    redirect('/admin/appointments')
}