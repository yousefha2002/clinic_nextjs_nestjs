'use client'
import { createTransaction } from '@/actions/transaction/createTransaction';
import ErrorMessage from '@/components/ui/ErrorMessage';
import InputField from '@/components/ui/InputField'
import Select from '@/components/ui/Select';
import SubmitButton from '@/components/ui/SubmitButton';
import TextAreaField from '@/components/ui/TextAreaField';
import { SelectProps } from '@/types/Select';
import payments from '@/utils/data/payments';
import React, { useActionState } from 'react'
import {FiDollarSign,FiBook,FiUser} from "react-icons/fi"; 

export default function CreateTransactionForm({patients}:{patients:SelectProps[]}) {
    const [state,action,isPending] = useActionState(createTransaction,null)
    return (
        <form action={action}>
            <div className='mb-3'>
            <InputField
                    type='number'
                    required={true}
                    name="fee"
                    placeholder="Fee"
                    icon={FiDollarSign}
                />
            </div>
            <div className='mb-3'>
                <Select
                    name='patientId' 
                    items={patients}
                    icon={FiUser}/>
            </div>
            <div className='mb-3'>
                <TextAreaField
                    name='note'
                    placeholder='Note'
                    required={true}
                    icon={FiBook}/>
            </div>
            <div className='mb-3'>
                <Select
                    name='status' 
                    items={payments.map(item => ({ id: item, name: item })) }
                    icon={FiDollarSign}
                />
            </div>
            <ErrorMessage>{state?.error}</ErrorMessage>
            <SubmitButton isPending={isPending}>Save</SubmitButton>
        </form>
    )
}