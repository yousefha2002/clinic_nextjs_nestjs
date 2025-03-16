'use client'
import { updateAppoinmentStatus } from '@/actions/appointment/updateAppointmentStatus';
import { AppointmentStatus } from '@/utils/enums/appointment-status';
import React from 'react'
import {FiCheckCircle, FiXCircle } from "react-icons/fi";

export default function AppointmentActions({id}:{id:number}) {
    
    async function handleStatus(status:AppointmentStatus.completed|AppointmentStatus.canceled)
    {
        await updateAppoinmentStatus(id,status)
    }

    return (
        <div className="flex gap-3 mt-4">
            <button 
                onClick={()=>handleStatus(AppointmentStatus.completed)}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white flex items-center justify-center gap-2">
                <FiCheckCircle />
                Complete
            </button>
        
            <button 
                onClick={()=>handleStatus(AppointmentStatus.canceled)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white flex items-center justify-center gap-2">
                <FiXCircle/>
                Cancel
            </button>
        </div>
    )
}