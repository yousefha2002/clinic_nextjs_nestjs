import { Transaction } from "@/types/Transaction";
import React from "react";
import TransactionItem from "./TransactionItem";
export default function TransactionsList({ transactions }: {transactions:Transaction[]}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Payments</h2>
      <div className="bg-gray-100 p-4 rounded-md">
        <div className="overflow-x-auto w-full">
          {
          transactions.length>0
          ?
          transactions.map((transaction) => (
            <TransactionItem transaction={transaction} key={transaction.id}/>
          ))
          :
          <h3 className="text-error font-semibold">You have not do any transaction</h3>
          }
        </div>
      </div>
    </div>
  );
}