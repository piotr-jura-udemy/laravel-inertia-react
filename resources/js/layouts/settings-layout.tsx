import AppLayout from "@/layouts/app-layout";
import { Link } from "@inertiajs/react";
import { User, CreditCard } from "lucide-react";
import { ReactNode } from "react";

interface SettingsLayoutProps {
    children: ReactNode;
    activeSection: "profile" | "billing";
}

export default function SettingsLayout({
    children,
    activeSection,
}: SettingsLayoutProps) {
    const menuItems = [
        {
            id: "profile" as const,
            label: "Profile Settings",
            icon: User,
            href: route("profile.show"),
        },
        {
            id: "billing" as const,
            label: "Billing",
            icon: CreditCard,
            href: route("billing.show"),
        },
    ];

    return (
        <AppLayout>
            <div className="flex gap-6">
                {/* Sidebar Navigation */}
                <aside className="w-64 shrink-0">
                    <nav className="space-y-1">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeSection === item.id;
                            return (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                        isActive
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    }`}
                                >
                                    <Icon className="h-5 w-5" />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </aside>

                {/* Main Content */}
                <div className="flex-1">{children}</div>
            </div>
        </AppLayout>
    );
}
