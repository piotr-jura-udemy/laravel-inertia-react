import { ReactNode } from "react";

interface AppLayoutProps {
    children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="bg-gray-50 min-h-screen">
            <main className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}
