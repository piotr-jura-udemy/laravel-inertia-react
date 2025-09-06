import AppHeader from "@/components/app-header";
import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

interface AppLayoutProps {
    children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="min-h-screen bg-background">
            <AppHeader />
            <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>
        </div>
    );
}
