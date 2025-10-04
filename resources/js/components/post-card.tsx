import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Post, PostLikesData } from "@/types";
import LikeButton from "./like-button";
import { Deferred } from "@inertiajs/react";

interface PostCardProps {
    post: Post;
    likes: PostLikesData;
}

export default function PostCard({ post, likes }: PostCardProps) {
    return (
        <Card className="rounded-none">
            <CardHeader>
                <CardTitle className="text-2xl">{post.title}</CardTitle>
                <CardDescription>
                    By {post.user?.name} on{" "}
                    {new Date(post.created_at).toLocaleDateString()}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-gray-700 whitespace-pre-wrap">{post.body}</p>
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
            </CardContent>
        </Card>
    );
}
