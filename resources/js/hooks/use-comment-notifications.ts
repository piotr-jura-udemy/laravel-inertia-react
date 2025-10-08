import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { Comment } from "@/types";

export function useCommentNotifications(
    comments: Comment[] | undefined,
    onScroll: () => void
) {
    const commentCountRef = useRef(comments?.length ?? 0);
    const iAmWritingComment = useRef(false);

    useEffect(() => {
        const newCommentCount = comments?.length ?? 0;

        if (
            newCommentCount > commentCountRef.current &&
            commentCountRef.current > 0 &&
            !iAmWritingComment.current
        ) {
            toast("New comments available", {
                duration: 6_000,
                action: {
                    label: "View Comments",
                    onClick: onScroll,
                },
            });
        }

        commentCountRef.current = newCommentCount;
        iAmWritingComment.current = false;
    }, [comments, onScroll]);

    const handleCommentAdded = () => {
        iAmWritingComment.current = true;
        toast("Comment has been added", {
            description: "Your comment is already live and visible",
        });
    };

    return { handleCommentAdded };
}
