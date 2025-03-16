import DepartmentTable from "@/components/admin/department/DepartmentTable";
import PrimaryLink from "@/components/ui/PrimaryLink";
import { getDepartments } from "@/lib/departments";
export default async function page() {
    const departments  = await getDepartments()
    return (
        <div>
            <div className="mb-4">
                <PrimaryLink href={`/admin/create-department`}>
                    Create New Department
                </PrimaryLink>
            </div>
            <DepartmentTable departments={departments}/>
        </div>
    );
}