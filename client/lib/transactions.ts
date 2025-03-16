import { Transaction } from "@/types/Transaction";
import { apiGet } from "@/utils/apiGet";
import { getUserToken } from "./auth";

export function getTransactions()
{
    return apiGet<Transaction[]>(`${process.env.API}payment`);
}

export function getTransaction(id:number)
{
    return apiGet<Transaction>(`${process.env.API}payment/${id}`);
}

export function getRecentlyTransaction()
{
    return apiGet<Transaction[]>(`${process.env.API}payment/recently`);
}

export function getTransactionsByPateint(patientId:number)
{
    return apiGet<Transaction[]>(`${process.env.API}payment/all/${patientId}`);
}

export async function getPatientTransactions()
{
    const token = await getUserToken()
    const tokenValue = token ? token.value : undefined;
    return apiGet<Transaction[]>(`${process.env.API}payment/all/mine`,tokenValue);
}