import React from 'react'

export default function SubmitButton({children,isPending}:{children:React.ReactNode,isPending?:boolean}) {
    return (
        <button
        disabled={isPending}
        className={`w-full px-6 py-2 mt-4 text-white ${isPending?'bg-blue-300':'bg-primary'} rounded-lg shadow-md hover:bg-primaryBg 
            focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 ease-in-out`}>
            {!isPending?children:"loading ..."}
        </button>
    )
}
