import React from 'react';
import ShadowParent from '@/components/ui/ShadowParent';
import Table from '@/components/table/Table';
import Header from '@/components/table/Header';
import TableData from '@/components/table/TableData';
import Status from '@/components/ui/Status';
import UpdateAction from '@/components/ui/UpdateAction';
import { AppointmentStatus } from '@/utils/enums/appointment-status';
import { Appointment } from '@/types/Appointment';
import formatDate from '@/utils/formatDate';
import formatTime from '@/utils/formatTime';

export default function AppointmentTable({ appointments }: { appointments: Appointment[] }) {
    const headerRows = ['ID', 'Patient', 'Doctor', 'Date', 'Time', 'Status', 'Update', 'Note'];

    return (
        <ShadowParent>
            <Table>
                <Header rows={headerRows} />
                <tbody>
                    {appointments.map((item) => {
                        const formattedDate = formatDate(item.date)
                        const formattedTime = formatTime(item.date)

                        return (
                            <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <TableData>{item.id}</TableData>
                                <TableData>{item.patient?.username}</TableData>
                                <TableData>{item.doctor?.username}</TableData>
                                <TableData>{formattedDate}</TableData>
                                <TableData>{formattedTime}</TableData>
                                <TableData><Status status={item.status as AppointmentStatus} /></TableData>
                                <TableData><UpdateAction href={`/admin/update-appointment/${item.id}`} /></TableData>
                                <TableData>{item.note}</TableData>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </ShadowParent>
    );
}
