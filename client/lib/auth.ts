import { roles } from "@/utils/enums/roles";
import { cookies } from "next/headers";

export async function getAdminAuth()
{
    const cookieStore = await cookies(); 
    const adminToken = cookieStore.get('adminToken');
    return adminToken
}

export async function setAdminAuth(token:string) {
    const cookieStore = await cookies();
    
    cookieStore.set("adminToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Secure in production
        path: "/",
    });
}

export async function setUserAuth(token:string,role:roles.Doctor|roles.Patient)
{
    const cookieStore = await cookies();
    
    cookieStore.set("userToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Secure in production
        path: "/",
    });
    cookieStore.set("userRole", role, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Secure in production
        path: "/",
    });
}

export async function getUserToken()
{
    const cookieStore = await cookies(); 
    const adminToken = cookieStore.get('userToken');
    return adminToken
}

export async function getUserRole()
{
    const cookieStore = await cookies(); 
    const adminToken = cookieStore.get('userRole');
    return adminToken
}

export async function clearAuth()
{
    const cookieStore = await cookies();
    cookieStore.delete('adminToken')
    cookieStore.delete('userToken')
    cookieStore.delete('userRole')
}