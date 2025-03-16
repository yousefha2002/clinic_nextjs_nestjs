import AppointmentTable from "@/components/admin/appointment/AppointmentTable";
import PrimaryLink from "@/components/ui/PrimaryLink";
import { getAppointments } from "@/lib/appointments";
export default async function page() {
    const appointments = await getAppointments()
    return (
        <div>
            <div className="mb-4">
                <PrimaryLink href={`/admin/create-appointment`}>
                    Create New Appointment
                </PrimaryLink>
            </div>
            <AppointmentTable appointments={appointments}/>
        </div>
    );
}