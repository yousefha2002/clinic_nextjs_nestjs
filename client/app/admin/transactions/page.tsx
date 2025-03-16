import TransactionTable from "@/components/admin/transaction/TransactionTable";
import PrimaryLink from "@/components/ui/PrimaryLink";
import { getTransactions } from "@/lib/transactions";
export default async function page() {
    const transactions = await getTransactions()
    return (
        <div>
            <div className="mb-4">
                <PrimaryLink href={`/admin/create-transaction`}>
                    Create New Transaction
                </PrimaryLink>
            </div>
            <TransactionTable transactions={transactions}/>
        </div>
    );
}