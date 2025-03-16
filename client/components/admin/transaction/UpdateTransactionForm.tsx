'use client'
import { updateTransaction } from '@/actions/transaction/updateTransaction';
import ErrorMessage from '@/components/ui/ErrorMessage';
import InputField from '@/components/ui/InputField'
import SubmitButton from '@/components/ui/SubmitButton';
import TextAreaField from '@/components/ui/TextAreaField';
import { Transaction } from '@/types/Transaction';
import React, { useActionState } from 'react'
import {FiDollarSign,FiBook} from "react-icons/fi"; 

export default function UpdateTransactionForm({transaction,id}:{transaction:Transaction,id:number}) {
    const [state,action,isPending] = useActionState(updateTransaction,null)
    return (
        <form action={action}>
            <InputField
                type='number'
                required={true}
                name="fee"
                placeholder="Fee"
                icon={FiDollarSign}
                defaultValue={transaction.fee.toString()}
            />
            <div className='my-3'>
                <TextAreaField
                name='note'
                placeholder='Note'
                required={true}
                icon={FiBook}
                defaultValue={transaction.note}
                />
            </div>
            <input type="hidden" name="id" value={id} />
            <ErrorMessage>{state?.error}</ErrorMessage>
            <SubmitButton isPending={isPending}>Save</SubmitButton>
        </form>
    )
}