import { useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { router, usePage } from "@inertiajs/react";
import NotificationBell from "./notification-bell";
import NotificationList from "./notification-list";
import type { Notification } from "./notification-item";
import { PageProps } from "@/types";
import {
    markAsRead as markAsReadAction,
    markAllAsRead as markAllAsReadAction,
} from "@/actions/App/Http/Controllers/NotificationController";

export default function NotificationsPopover() {
    const { notifications } = usePage<PageProps>().props;
    const [open, setOpen] = useState(false);

    const markAsRead = (id: string) => {
        router.post(
            markAsReadAction(id).url,
            {},
            {
                preserveScroll: true,
                only: ["notifications"],
            }
        );
    };

    const markAllAsRead = () => {
        router.post(
            markAllAsReadAction().url,
            {},
            {
                preserveScroll: true,
                only: ["notifications"],
            }
        );
    };

    const getNotificationLink = (notification: Notification) => {
        const data = notification.data;
        switch (notification.type) {
            case "follow":
                return `/users/${notification.actor.id}`;
            case "post_like":
            case "new_post":
                return `/posts/${data.post_id}`;
            case "comment_like":
            case "new_comment":
                return `/posts/${data.post_id}`;
            default:
                return "#";
        }
    };

    const handleNotificationClick = (notification: Notification) => {
        if (!notification.read_at) {
            markAsRead(notification.id);
        }
        const link = getNotificationLink(notification);
        if (link !== "#") {
            router.visit(link);
            setOpen(false);
        }
    };

    if (!notifications) {
        return null;
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div>
                    <NotificationBell
                        unreadCount={notifications.unread_count}
                    />
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
                <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="font-semibold">Notifications</h3>
                    {notifications.unread_count > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={markAllAsRead}
                            className="text-xs"
                        >
                            Mark all read
                        </Button>
                    )}
                </div>
                <NotificationList
                    notifications={notifications.data}
                    onNotificationClick={handleNotificationClick}
                />
            </PopoverContent>
        </Popover>
    );
}
