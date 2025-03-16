"use server";
import {getUserToken } from "@/lib/auth";
import { FormResponse } from "@/types/FormResponse";
import { apiPost } from "@/utils/apiPost";
import { handleApiError } from "@/utils/handleApiError";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function changePassword(prev: unknown, formData: FormData): Promise<FormResponse> {
    const oldPassword = formData.get('oldPassword')
    const newpassword = formData.get('newPassword')
    const token = await getUserToken()
    const tokenValue = token ? token.value : undefined;
    // Call the API to attempt login
    const response = await apiPost(
        `${process.env.API}user/password`,
        "PATCH",
        { oldPassword,newpassword},
        tokenValue
    );

    // If API returns errors, handle them
    if (response.message) {
        return { error: handleApiError(response) };
    }
    revalidatePath('/','layout')
    redirect("/user");
}