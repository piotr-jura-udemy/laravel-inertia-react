import AppHeader from "@/components/app-header";
import { Toaster } from "@/components/ui/sonner";
import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import { ReactNode, useEffect } from "react";
import { toast } from "sonner";

interface AppLayoutProps {
    children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    const { flash } = usePage<PageProps>().props;

    useEffect(() => {
        if (flash.success) {
            toast(flash.success);
        }
        if (flash.error) {
            toast(flash.error);
        }
    }, [flash]);

    return (
        <div className="bg-gray-50 min-h-screen">
            <AppHeader />
            <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>
            <Toaster />
        </div>
    );
}
