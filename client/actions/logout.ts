'use server'
import { clearAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
export async function logout(path:string)
{
    await clearAuth()
    redirect(path)
}