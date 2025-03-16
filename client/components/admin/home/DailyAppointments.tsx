import React from 'react'
import Table from '@/components/table/Table'
import Header from '@/components/table/Header'
import TableData from '@/components/table/TableData'
import ShadowParent from '@/components/ui/ShadowParent'
import { Appointment } from '@/types/Appointment'
import formatTime from '@/utils/formatTime'

export default function DailyAppointments({appointments}:{appointments:Appointment[]}) {
    const headerRows = ["id","Pateint","Doctor","Time"]
    return (
        <ShadowParent>
            <h3 className='mb-4 font-semibold text-[18px]'>Daily Appointments</h3>
            <Table>
                <Header rows={headerRows}/>
                <tbody>
                    {appointments.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
                        <TableData >{item.id}</TableData>
                        <TableData >{item.patient?.username}</TableData>
                        <TableData >{item.doctor?.username}</TableData>
                        <TableData >{formatTime(item.date)}</TableData>
                    </tr>
                ))}
                </tbody>
            </Table>
        </ShadowParent>
    )
}