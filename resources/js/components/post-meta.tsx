import { Link } from "@inertiajs/react";
import { formatDistanceToNow } from "date-fns";

interface PostMetaProps {
    userId: number;
    userName: string;
    date: string;
    size?: "sm" | "md";
}

export default function PostMeta({
    userId,
    userName,
    date,
    size = "md",
}: PostMetaProps) {
    const timeAgo = formatDistanceToNow(new Date(date), { addSuffix: true });
    const textSize = size === "sm" ? "text-xs" : "text-sm";

    return (
        <div className={`${textSize} text-muted-foreground`}>
            <Link
                href={`/users/${userId}`}
                className="font-medium hover:text-foreground transition-colors"
            >
                {userName}
            </Link>
            <span className="mx-1.5">·</span>
            <time dateTime={date} title={new Date(date).toLocaleString()}>
                {timeAgo}
            </time>
        </div>
    );
}
