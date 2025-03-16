"use server";
import { getAdminAuth } from "@/lib/auth";
import { FormResponse } from "@/types/FormResponse";
import { apiPost } from "@/utils/apiPost";
import { handleApiError } from "@/utils/handleApiError";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTransaction(prev: unknown, formData: FormData): Promise<FormResponse> {
    const note = formData.get("note")
    const status = formData.get("status")
    const patientId = formData.get("patientId")
    const fee = formData.get("fee") ? parseInt(formData.get("fee") as string) : 0;
    const token = await getAdminAuth()
    const tokenValue = token ? token.value : undefined;
    // Call the API to attempt login
    const response = await apiPost(
        `${process.env.API}payment`,
        "POST",
        { note,status,patientId,fee },
        tokenValue
    );

    // If API returns errors, handle them
    if (response.message) {
        return { error: handleApiError(response) };
    }
    revalidatePath('/','layout')
    redirect("/admin/transactions");
}