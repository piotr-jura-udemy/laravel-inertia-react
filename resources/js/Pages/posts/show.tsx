import AppLayout from "@/layouts/app-layout";
import { Comment, Post } from "@/types";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import CommentForm from "@/components/comment-form";
import CommentCard from "@/components/comment-card";
import { Deferred } from "@inertiajs/react";
import { useRef } from "react";

interface PostsShowProps {
    post: Post;
    comments: Comment[];
}

export default function PostsShow({ post, comments }: PostsShowProps) {
    const commentsSectionRef = useRef<HTMLDivElement>(null);

    const handleCommentAdded = () => {
        setTimeout(() => {
            commentsSectionRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }, 100);
    };
    return (
        <AppLayout>
            <div className="space-y-6">
                {/* Post Content */}
                <Card className="rounded-none">
                    <CardHeader>
                        <CardTitle className="text-2xl">{post.title}</CardTitle>
                        <CardDescription>
                            By {post.user?.name} on{" "}
                            {new Date(post.created_at).toLocaleDateString()}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-700 whitespace-pre-wrap">
                            {post.body}
                        </p>
                    </CardContent>
                </Card>

                {/* Comment Form */}
                <CommentForm
                    postId={post.id}
                    onCommentAdded={handleCommentAdded}
                />

                {/* Comments Section */}
                <div ref={commentsSectionRef}>
                    <Deferred
                        data="comments"
                        fallback={
                            <div className="text-center py-8">
                                <p className="text-gray-500">
                                    Loading commnets...
                                </p>
                            </div>
                        }
                    >
                        <div className="space-y-4">
                            {comments && comments.length > 0 ? (
                                <div>
                                    {comments.map((comment) => (
                                        <CommentCard
                                            key={comment.id}
                                            comment={comment}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">
                                        No comments yet.
                                    </p>
                                </div>
                            )}
                        </div>
                    </Deferred>
                </div>
            </div>
        </AppLayout>
    );
}
