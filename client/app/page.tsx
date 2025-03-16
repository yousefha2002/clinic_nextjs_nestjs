'use client'
import { login } from "@/actions/user/login";
import Login from "@/components/auth/Login";
import { useActionState } from "react";

export default function page() {
    const [state,action,isPending] = useActionState(login,null)
    return (
        <form action={action}>
            <Login 
                isPending={isPending}
                serverError={state?.error}
            />
        </form>
    );
}