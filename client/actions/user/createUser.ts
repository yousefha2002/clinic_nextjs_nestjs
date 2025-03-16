"use server";
import { getAdminAuth } from "@/lib/auth";
import { FormResponse } from "@/types/FormResponse";
import { apiPost } from "@/utils/apiPost";
import { roles } from "@/utils/enums/roles";
import { handleApiError } from "@/utils/handleApiError";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createUser(prev: unknown, formData: FormData): Promise<FormResponse> {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const email = formData.get("email") as string;
    const role = formData.get("role") as string;
    const departmentId = formData.get("departmentId") as string | null;
    const birthdate = formData.get("birthdate") as string;
    const token = await getAdminAuth();
    const tokenValue = token ? token.value : undefined;

    // Prepare the request payload
    const requestPayload: any = { username, password, email, birthdate, role };

    // Include departmentId only if role is "patient"
    if (role === roles.Doctor && departmentId) {
        requestPayload.departmentId = departmentId;
    }

    // Call the API to attempt creating the user
    const response = await apiPost(
        `${process.env.API}user/signup`,
        "POST",
        requestPayload,
        tokenValue
    );

    // If API returns errors, handle them
    if (response.message) {
        return { error: handleApiError(response) };
    }

    revalidatePath('/', 'layout');
    redirect(`/admin/${role === roles.Doctor ? 'doctors' : 'patients'}`);
}