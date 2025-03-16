import InputField from "@/components/ui/InputField";
import SubmitButton from "@/components/ui/SubmitButton";
import { FiMail, FiLock } from "react-icons/fi";
import ErrorMessage from "../ui/ErrorMessage";

export default function Login({serverError,isPending}:{serverError?:string|null,isPending:boolean}) {
    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                Welcome Back
                </h2>
                <div className="mb-4">
                <InputField
                    type="text"
                    required={true}
                    name="email"
                    placeholder="E-mail"
                    icon={FiMail}
                />
                </div>
                <div className="mb-6">
                <InputField
                    required={true}
                    type="password"
                    name="password"
                    placeholder="Password"
                    icon={FiLock}
                />
                </div>
                <ErrorMessage>{serverError}</ErrorMessage>
                <SubmitButton isPending={isPending}>Login</SubmitButton>
            </div>
        </main>
    );
}
