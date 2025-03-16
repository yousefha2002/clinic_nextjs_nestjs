import { apiGet } from "@/utils/apiGet";
import { getAdminAuth } from "./auth";

type Admin = {
    id:string,
    email:string
}
export async function getAdmin()
{
    const token = await getAdminAuth()
    const tokenValue = token ? token.value : undefined; 
    return apiGet<Admin>(`${process.env.API}admin`,tokenValue);
}