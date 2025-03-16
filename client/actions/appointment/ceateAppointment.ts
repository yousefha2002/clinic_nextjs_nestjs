"use server";
import { getAdminAuth } from "@/lib/auth";
import { FormResponse } from "@/types/FormResponse";
import { apiPost } from "@/utils/apiPost";
import { handleApiError } from "@/utils/handleApiError";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createAppointment(prev: unknown, formData: FormData): Promise<FormResponse> {
    const note = formData.get("note")
    const patientId = formData.get("patientId")
    const doctorId = formData.get("doctorId")
    const date = formData.get('date')
    const token = await getAdminAuth()
    const tokenValue = token ? token.value : undefined;
    // Call the API to attempt login
    const response = await apiPost(
        `${process.env.API}appointment/create`,
        "POST",
        { note,patientId,doctorId,date},
        tokenValue
    );

    // If API returns errors, handle them
    if (response.message) {
        return { error: handleApiError(response) };
    }
    revalidatePath('/','layout')
    redirect("/admin/appointments");
}