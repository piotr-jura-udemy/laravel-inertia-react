import NotificationItem, { type Notification } from "./notification-item";

interface NotificationListProps {
    notifications: Notification[];
    onNotificationClick: (notification: Notification) => void;
}

export default function NotificationList({
    notifications,
    onNotificationClick,
}: NotificationListProps) {
    if (notifications.length === 0) {
        return (
            <div className="p-4 text-center text-sm text-muted-foreground">
                No notifications yet
            </div>
        );
    }

    return (
        <div className="max-h-[400px] overflow-y-auto">
            {notifications.map((notification) => (
                <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onNotificationClick={onNotificationClick}
                />
            ))}
        </div>
    );
}
