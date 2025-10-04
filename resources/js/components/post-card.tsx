import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Post, PostLikesData } from "@/types";
import LikeButton from "./like-button";
import { Deferred, Link } from "@inertiajs/react";
import PostMeta from "./post-meta";
import { Heart, MessageSquare } from "lucide-react";

interface PostCardProps {
    post: Post;
    likes?: PostLikesData;
    variant?: "full" | "compact" | "minimal";
    showLikeButton?: boolean;
    className?: string;
}

export default function PostCard({
    post,
    likes,
    variant = "full",
    showLikeButton = true,
    className,
}: PostCardProps) {
    const titleLink =
        variant !== "full" ? (
            <Link href={`/posts/${post.id}`} className="hover:underline">
                {post.title}
            </Link>
        ) : (
            post.title
        );

    // Full variant - complete post view (default for post detail page)
    if (variant === "full") {
        return (
            <Card className={className}>
                <CardHeader className="space-y-2">
                    <CardTitle className="text-2xl">{titleLink}</CardTitle>
                    <PostMeta
                        userId={post.user_id}
                        userName={post.user?.name || "Unknown"}
                        date={post.created_at}
                    />
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-gray-700 whitespace-pre-wrap">
                        {post.body}
                    </p>
                    {showLikeButton && likes && (
                        <Deferred
                            data="likes"
                            fallback={
                                <LikeButton
                                    type="posts"
                                    id={post.id}
                                    count={likes?.count}
                                    liked={likes?.user_has_liked}
                                    isLoading={!likes}
                                />
                            }
                        >
                            <LikeButton
                                type="posts"
                                id={post.id}
                                count={likes?.count}
                                liked={likes?.user_has_liked}
                            />
                        </Deferred>
                    )}
                </CardContent>
            </Card>
        );
    }

    // Compact variant - summary with truncated body (for home/index pages)
    if (variant === "compact") {
        return (
            <Card className={className}>
                <CardHeader className="space-y-2">
                    <CardTitle>{titleLink}</CardTitle>
                    <PostMeta
                        userId={post.user_id}
                        userName={post.user?.name || "Unknown"}
                        date={post.created_at}
                    />
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        {post.body.substring(0, 200)}
                        {post.body.length > 200 && "..."}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <Heart size={16} />
                            <span>{post.likes_count ?? 0}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <MessageSquare size={16} />
                            <span>{post.comments_count ?? 0}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    // Minimal variant - just title and meta (for user profiles)
    return (
        <Card className={className}>
            <CardHeader className="pb-3 space-y-2">
                <CardTitle className="text-lg leading-tight">
                    {titleLink}
                </CardTitle>
                <PostMeta
                    userId={post.user_id}
                    userName={post.user?.name || "Unknown"}
                    date={post.created_at}
                    size="sm"
                />
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
                <p className="text-sm text-muted-foreground line-clamp-2">
                    {post.body}
                </p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                        <Heart size={14} />
                        <span>{post.likes_count ?? 0}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <MessageSquare size={14} />
                        <span>{post.comments_count ?? 0}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
