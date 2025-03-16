"use client";
import React, { startTransition, useOptimistic } from 'react';
import ShadowParent from '@/components/ui/ShadowParent';
import Table from '@/components/table/Table';
import { Department } from '@/types/Department';
import Header from '@/components/table/Header';
import TableData from '@/components/table/TableData';
import UpdateAction from '@/components/ui/UpdateAction';
import DeleteAction from '@/components/ui/DeleteAction';
import { deleteDepartment } from '@/actions/department/deleteDepartment';

export default function DepartmentTable({ departments }: { departments: Department[] }) {
    const headerRows = ['ID', 'Name', "Doctors", 'Actions'];

    const [optimisticDepartments, setOptimisticDepartments] = useOptimistic(
        departments,
        (currentDepartments, id: number) => {
            return currentDepartments.filter(department => department.id !== id);
        }
    );

    const handleDelete = async(id: number) => {
        startTransition(() => {
            setOptimisticDepartments(id);
        });
        await deleteDepartment(id)
    };

    return (
        <ShadowParent>
            <Table>
                <Header rows={headerRows} />
                <tbody>
                    {optimisticDepartments.map((item) => (
                        <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
                            <TableData>{item.id}</TableData>
                            <TableData>{item.name}</TableData>
                            <TableData classes="flex flex-wrap gap-x-5 gap-y-2">
                                {item.doctors?.map((doctor, index) => (
                                    <span key={index} className="bg-upcoming px-3 rounded-full text-white">
                                        {doctor.username}
                                    </span>
                                ))}
                            </TableData>
                            <TableData>
                                <div className="flex gap-x-2 items-center">
                                    <UpdateAction href={`/admin/update-department/${item.id}`} />
                                    <DeleteAction handleDelete={() => handleDelete(item.id)} />
                                </div>
                            </TableData>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </ShadowParent>
    );
}