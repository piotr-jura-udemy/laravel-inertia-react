import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface NotificationBellProps {
    unreadCount: number;
}

export default function NotificationBell({
    unreadCount,
}: NotificationBellProps) {
    return (
        <button className="relative p-2 hover:bg-gray-100 rounded-md transition-colors">
            <Bell className="h-5 w-5 text-gray-600" />
            {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {unreadCount > 9 ? "9+" : unreadCount}
                </Badge>
            )}
        </button>
    );
}
