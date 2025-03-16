"use server";
import {clearAuth, setUserAuth } from "@/lib/auth";
import { FormResponse } from "@/types/FormResponse";
import { apiPost } from "@/utils/apiPost";
import { roles } from "@/utils/enums/roles";
import { handleApiError } from "@/utils/handleApiError";
import { redirect } from "next/navigation";

export async function login(prev: unknown, formData: FormData): Promise<FormResponse> {
    const email = formData.get("email")
    const password = formData.get("password")

    // Call the API to attempt login
    const response = await apiPost<{ token: string; user: any,role:roles.Doctor|roles.Patient }>(
        `${process.env.API}user/login`,
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
        setUserAuth(response.data.token,response.data.role)
    }

    // Redirect on successful login
    redirect("/user");
}