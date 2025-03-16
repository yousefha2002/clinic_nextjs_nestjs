import UpdateDepartmentForm from '@/components/admin/department/UpdateDepartmentForm';
import { getDepartment } from '@/lib/departments';
import React from 'react'

export default async function page({params}:{params:Promise<{id:number}>}) {
    const {id} = await params
    const department = await getDepartment(id)
    return (
        <UpdateDepartmentForm name={department.name} id={id}/>
    )
}
