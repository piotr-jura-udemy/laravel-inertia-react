import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Comment, Post } from "@/types";
import { Link } from "@inertiajs/react";
import { Heart } from "lucide-react";
import PostMeta from "./post-meta";
import ContentBadge from "./content-badge";

interface LikedPostProps {
    type: "post";
    data: Post;
}

interface LikedCommentProps {
    type: "comment";
    data: Comment;
}

type LikedContentCardProps = LikedPostProps | LikedCommentProps;

export default function LikedContentCard(props: LikedContentCardProps) {
    if (props.type === "post") {
        const post = props.data;
        return (
            <Card>
                <CardHeader className="pb-3 space-y-2">
                    <ContentBadge
                        icon={Heart}
                        iconClassName="text-red-500 fill-red-500"
                    >
                        <span>Liked</span>
                    </ContentBadge>
                    <CardTitle className="text-lg leading-tight">
                        <Link
                            href={`/posts/${post.id}`}
                            className="hover:underline"
                        >
                            {post.title}
                        </Link>
                    </CardTitle>
                    <PostMeta
                        userId={post.user_id}
                        userName={post.user?.name || "Unknown"}
                        date={post.created_at}
                        size="sm"
                    />
                </CardHeader>
                <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {post.body}
                    </p>
                </CardContent>
            </Card>
        );
    }

    const comment = props.data;
    return (
        <Card>
            <CardHeader className="pb-3 space-y-2">
                <ContentBadge
                    icon={Heart}
                    iconClassName="text-red-500 fill-red-500"
                >
                    <span>Liked reply</span>
                </ContentBadge>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <PostMeta
                        userId={comment.user_id}
                        userName={comment.user?.name || "Unknown"}
                        date={comment.created_at}
                        size="sm"
                    />
                    <span>·</span>
                    <Link
                        href={`/posts/${comment.post_id}`}
                        className="text-primary hover:underline"
                    >
                        {comment.post?.title || "a post"}
                    </Link>
                </div>
            </CardHeader>
            <CardContent className="pt-0">
                <p className="text-sm">{comment.body}</p>
            </CardContent>
        </Card>
    );
}
