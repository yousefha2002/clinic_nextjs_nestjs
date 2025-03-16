import { apiGet } from "@/utils/apiGet";

interface StatisticsData {
    doctors: string;
    patients: string;
    payments: string;
    appointments: string;
}

export interface monthlyStatisicts {
    month:number,
    appointmentsCount:number,
    revenue:number
}

export function getStatisticsForAdmin()
{
    return apiGet<StatisticsData>(`${process.env.API}statistics/total`);
}

export function getMonthlyStatisicts()
{
    return apiGet<monthlyStatisicts[]>(`${process.env.API}statistics/monthly`)
}