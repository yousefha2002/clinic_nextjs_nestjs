'use client'
import ShadowParent from '@/components/ui/ShadowParent'
import React from 'react'

interface ErrorProps {
    error: Error
}

export default function Error({ error }: ErrorProps) {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
            <ShadowParent classStyle="text-center p-6 bg-white rounded-2xl shadow-lg max-w-sm">
                <div className="flex flex-col items-center">
                    <h1 className="text-2xl font-bold text-gray-800">Oops! Something went wrong.</h1>
                    <p className="text-error mt-2">{error.message || "An unexpected error occurred."}</p>
                </div>
            </ShadowParent>
        </div>
    )
}