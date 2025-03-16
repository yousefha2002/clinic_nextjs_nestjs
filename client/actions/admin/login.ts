"use server";
import { clearAuth, setAdminAuth } from "@/lib/auth";
import { FormResponse } from "@/types/FormResponse";
import { apiPost } from "@/utils/apiPost";
import { handleApiError } from "@/utils/handleApiError";
import { redirect } from "next/navigation";

export async function login(prev: unknown, formData: FormData): Promise<FormResponse> {
    const email = formData.get("email")
    const password = formData.get("password")

    // Call the API to attempt login
    const response = await apiPost<{ token: string; user: any }>(
        `${process.env.API}admin/login`,
        "POST",
        { email, password }
    );

    // If API returns errors, handle them
    if (response.message) {
        return { error: handleApiError(response) };
    }

    // If successful, return user data
    if (response.data) {
        clearAuth()
        setAdminAuth(response.data.token)
    }

    // Redirect on successful login
    redirect("/admin");
}