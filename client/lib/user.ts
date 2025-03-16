import { User } from "@/types/User";
import { apiGet } from "@/utils/apiGet";
import { roles } from "@/utils/enums/roles";
import { getUserToken } from "./auth";

export function getUsers(role:roles.Doctor|roles.Patient)
{
    return apiGet<User[]>(`${process.env.API}user?role=${role}`);
}

export function getUser(id:number)
{
    return apiGet<User>(`${process.env.API}user/${id}`);
}

export async function getUserProfile()
{
    const token = await getUserToken()
    const tokenValue = token ? token.value : undefined;
    return apiGet<User>(`${process.env.API}user/profile`,tokenValue);
}