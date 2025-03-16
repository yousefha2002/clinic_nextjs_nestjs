import Sidebar from "@/components/layout/Sidebar";
import Wrapper from "@/components/layout/Wrapper";
import { getUserRole } from "@/lib/auth";
import {doctorItems, patientItems } from "@/utils/data/menuItems";
import { roles } from "@/utils/enums/roles";

export default async function RootLayout({
    children,
    }: Readonly<{
    children: React.ReactNode;
    }>) {
    const roleCookie = await getUserRole()
    const role = roleCookie?.value
    return (
        <div className="flex items-start">
            <Sidebar menuItems={role===roles.Doctor?doctorItems:patientItems} role={role as roles} />
            <Wrapper role={role as roles}>
                {children}
            </Wrapper>
        </div>
    );
}