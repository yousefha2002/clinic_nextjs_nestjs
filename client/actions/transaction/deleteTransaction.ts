"use server";
import { getAdminAuth } from "@/lib/auth";
import { apiPost } from "@/utils/apiPost";
import { handleApiError } from "@/utils/handleApiError";
import { revalidatePath } from "next/cache";

export async function deleteTransaction(id:number){
    const token = await getAdminAuth()
    const tokenValue = token ? token.value : undefined;
    // Call the API to attempt login
    const response = await apiPost(
        `${process.env.API}payment/${id}`,
        "DELETE",{},
        tokenValue
    );

    // If API returns errors, handle them
    if (response.message) {
        return { error: handleApiError(response) };
    }
    revalidatePath('/','layout')
}