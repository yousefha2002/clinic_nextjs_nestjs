'use client';
import Header from "@/components/table/Header";
import Table from "@/components/table/Table";
import TableData from "@/components/table/TableData";
import PrimaryLink from "@/components/ui/PrimaryLink";
import ShadowParent from "@/components/ui/ShadowParent";
import { User } from "@/types/User";
import { roles } from "@/utils/enums/roles";
import Image from "next/image";
import ShowAction from "@/components/ui/ShowAction";

type props = {
    role:roles.Doctor | roles.Patient,
    data:User[]
}

export default function UserTable({role,data}:props) {
    const isDoctor = role===roles.Doctor
    const headerRows = ['ID','Name','Email','Image',"show",isDoctor&&"department"].filter(Boolean) as string[];
    return (
        <div>
            <div className="mb-4">
                <PrimaryLink href={`/admin/create-user`}>
                    Create New User
                </PrimaryLink>
            </div>
            <ShadowParent>
                <Table>
                    <Header rows={headerRows}/>
                    <tbody>
                    {data.map((item) => (
                        <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
                            <TableData >{item.id}</TableData>
                            <TableData >{item.username}</TableData>
                            <TableData >{item.email}</TableData>
                            <TableData ><Image width={50} height={50} src={item.image} alt="image"/></TableData>
                            <TableData><ShowAction href={isDoctor?`/admin/doctors/${item.id}`:`/admin/patients/${item.id}`}/></TableData>
                            {
                                isDoctor&&<TableData>{item.department?.name}</TableData>
                            }
                    </tr>
                    ))}
                    </tbody>
                </Table>
            </ShadowParent>
        </div>
    );
}