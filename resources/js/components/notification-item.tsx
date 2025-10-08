import { cn } from "@/lib/utils";

export interface Notification {
    id: string;
    type: string;
    actor: {
        id: number;
        name: string;
    };
    data: any;
    read_at: string | null;
    created_at: string;
}

interface NotificationItemProps {
    notification: Notification;
    onNotificationClick: (notification: Notification) => void;
}

export default function NotificationItem({
    notification,
    onNotificationClick,
}: NotificationItemProps) {
    const getMessage = () => {
        switch (notification.type) {
            case "follow":
                return `${notification.actor.name} started following you`;
            case "post_like":
                return `${notification.actor.name} liked your post`;
            case "comment_like":
                return `${notification.actor.name} liked your comment`;
            case "new_post":
                return `${notification.actor.name} created a new post`;
            case "new_comment":
                return `${notification.actor.name} commented on a post`;
            default:
                return "New notification";
        }
    };

    const getTimeAgo = () => {
        const date = new Date(notification.created_at);
        const now = new Date();
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (seconds < 60) return "just now";
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        if (days < 7) return `${days}d ago`;
        const weeks = Math.floor(days / 7);
        return `${weeks}w ago`;
    };

    return (
        <div
            onClick={() => onNotificationClick(notification)}
            className={cn(
                "p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors",
                !notification.read_at && "bg-blue-50/50"
            )}
        >
            <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm font-bold shrink-0">
                    {notification.actor.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm">{getMessage()}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                        {getTimeAgo()}
                    </p>
                </div>
                {!notification.read_at && (
                    <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                )}
            </div>
        </div>
    );
}
