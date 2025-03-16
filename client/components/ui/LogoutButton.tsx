'use client'
import { logout } from '@/actions/logout';
import { devices } from '@/utils/enums/devices';
import { usePathname } from 'next/navigation';
import React from 'react'
import { MdLogout } from "react-icons/md";

export default function LogoutButton({device}:{device:devices.Desktop|devices.Mobile}) {
    const pathname = usePathname()
    return (
        <button 
            className={`flex items-center p-3 mb-2 rounded-lg cursor-pointer
                ${device===devices.Desktop&&'hover:bg-primaryBg'}
                ${device===devices.Mobile&&`hover:bg-grayBg`}`}
            onClick={()=>logout(pathname)}
        >
            <MdLogout/>
            <span className="ml-3">Logout</span>
        </button>
    )
}
