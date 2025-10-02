import { Toaster } from "@/components/ui/sonner";
import { ReactNode } from "react";

interface AuthLayoutProps {
    children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md">{children}</div>
            <Toaster />
        </div>
    );
}
