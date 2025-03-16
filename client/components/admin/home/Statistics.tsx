import React from 'react'
import StatisticsBox from '../../ui/StatisticsBox'
import {FiUsers, FiCalendar, FiDollarSign} from "react-icons/fi"; 

export default function Statistics({doctors,patients,payments,appointments}:{doctors:string,patients:string,payments:string,appointments:string}) {
    return (
        <div className="statisticsGrid">
            <StatisticsBox color="#E74C3C" icon={FiUsers} text="Total Doctors" number={+doctors}/>
            <StatisticsBox color="#3498DB" icon={FiUsers} text="Total Patients" number={+patients}/>
            <StatisticsBox color="#F39C12" icon={FiCalendar} text="Total Appointments" number={+appointments}/>
            <StatisticsBox color="#27AE60" icon={FiDollarSign} text="Total Revenue" number={+payments}/>
        </div>
    )
}