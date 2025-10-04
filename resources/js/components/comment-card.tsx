import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Comment } from "@/types";
import LikeButton from "./like-button";
import PostMeta from "./post-meta";
import { Link } from "@inertiajs/react";
import { MessageCircle } from "lucide-react";

interface CommentCardProps {
    comment: Comment;
    variant?: "full" | "with-context";
    showLikeButton?: boolean;
    className?: string;
}

export default function CommentCard({
    comment,
    variant = "full",
    showLikeButton = true,
    className,
}: CommentCardProps) {
    // Full variant - standalone comment (default for post pages)
    if (variant === "full") {
        return (
            <Card className={className}>
                <CardHeader className="pb-3">
                    <PostMeta
                        userId={comment.user_id}
                        userName={comment.user?.name || "Unknown"}
                        date={comment.created_at}
                        size="sm"
                    />
                </CardHeader>
                <CardContent className="space-y-3">
                    <p>{comment.body}</p>
                    {showLikeButton && comment.likes_data && (
                        <LikeButton
                            type="comments"
                            id={comment.id}
                            count={comment.likes_data.count}
                            liked={comment.likes_data.user_has_liked}
                        />
                    )}
                </CardContent>
            </Card>
        );
    }

    // With-context variant - shows which post it's replying to (for user profiles)
    return (
        <Card className={className}>
            <CardHeader className="pb-3 space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MessageCircle size={12} />
                    <span>Reply to</span>
                    <Link
                        href={`/posts/${comment.post_id}`}
                        className="text-primary hover:underline"
                    >
                        {comment.post?.title || "a post"}
                    </Link>
                </div>
                <PostMeta
                    userId={comment.user_id}
                    userName={comment.user?.name || "Unknown"}
                    date={comment.created_at}
                    size="sm"
                />
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
                <p className="text-sm">{comment.body}</p>
                {showLikeButton && comment.likes_data && (
                    <LikeButton
                        type="comments"
                        id={comment.id}
                        count={comment.likes_data.count}
                        liked={comment.likes_data.user_has_liked}
                    />
                )}
            </CardContent>
        </Card>
    );
}
