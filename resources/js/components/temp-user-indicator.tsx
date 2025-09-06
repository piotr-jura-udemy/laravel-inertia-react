import { Link } from "@inertiajs/react";
import { User } from "@/types";

interface TempUserIndicatorProps {
    user: User;
}

export default function TempUserIndicator({ user }: TempUserIndicatorProps) {
    return (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-yellow-800">
                        <strong>Temp User:</strong> {user.name}
                    </span>
                </div>
                <Link
                    href="/temp-logout"
                    className="text-xs bg-yellow-200 hover:bg-yellow-300 px-2 py-1 rounded transition-colors"
                >
                    Switch User
                </Link>
            </div>
        </div>
    );
}
