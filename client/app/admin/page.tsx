import DailyAppointments from "@/components/admin/home/DailyAppointments";
import LastTransactions from "@/components/admin/home/LastTransactions";
import QuickActions from "@/components/admin/home/QuickActions";
import RevenueAppointmentsChart from "@/components/admin/home/RevenueAppointmentsChart";
import Statistics from "@/components/admin/home/Statistics";
import { getDailyAppointments } from "@/lib/appointments";
import { getMonthlyStatisicts, getStatisticsForAdmin } from "@/lib/statistics";
import { getRecentlyTransaction } from "@/lib/transactions";


export default async function page() {
    const [statistics,appointments,transactions,monthlyStatisicts] = await Promise.all([
        getStatisticsForAdmin(),
        getDailyAppointments(),
        getRecentlyTransaction(),
        getMonthlyStatisicts()
    ])
    return (
        <div>
            <Statistics {...statistics}/>
            <QuickActions/>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-8">
                <DailyAppointments appointments={appointments}/>
                <LastTransactions transactions={transactions}/>
            </div>
            <div className="my-8">
                <RevenueAppointmentsChart monthlyStatisicts={monthlyStatisicts}/>
            </div>
        </div>
    );
}