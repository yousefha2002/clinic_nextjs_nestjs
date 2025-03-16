import React from 'react'
import { FiDelete } from "react-icons/fi";

type DeleteActionProps = {
    handleDelete: () => void;
}

export default function DeleteAction({handleDelete}:DeleteActionProps) {
    return (
        <button className=' text-error' onClick={handleDelete}>
            <FiDelete size={20}/>
        </button>
    )
}
