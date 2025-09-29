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
import { Deferred, usePoll } from "@inertiajs/react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import CommentList from "@/components/comment-list";
import LikeButton from "@/components/like-button";

interface PostsShowProps {
    post: Post;
    comments: Comment[];
}

export default function PostsShow({ post, comments }: PostsShowProps) {
    const commentsSectionRef = useRef<HTMLDivElement>(null);
    // useState - displayed on the page
    // useRef   - internal logic
    const commentCountRef = useRef(comments?.length ?? 0);
    const iAmWritingComment = useRef(false);

    const scrollToComments = () =>
        commentsSectionRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });

    usePoll(3_000, {
        only: ["comments"],
    });

    // undefined => 0 => 0 => 1 => 1 => 1 => 3
    useEffect(() => {
        // Current length of comments []
        const newCommentCount = comments?.length ?? 0;
        // We have stored the previous length
        // We compare them and show toast if different
        if (
            newCommentCount > commentCountRef.current &&
            commentCountRef.current > 0 &&
            !iAmWritingComment.current
        ) {
            toast("New comments available", {
                duration: 6_000,
                action: {
                    label: "View Comments",
                    onClick: scrollToComments,
                },
            });
        }
        // And we update the previous length = current length
        commentCountRef.current = newCommentCount;
        iAmWritingComment.current = false;
    }, [comments]);

    const handleCommentAdded = () => {
        iAmWritingComment.current = true;
        toast("Comment has been added", {
            description: "Your comment is already live and visible",
        });
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
                    <CardContent className="space-y-4">
                        <p className="text-gray-700 whitespace-pre-wrap">
                            {post.body}
                        </p>
                        <LikeButton
                            postId={post.id}
                            count={10}
                            liked={true}
                            isLoading={true}
                        />
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
                        fallback={<CommentList comments={comments} />}
                    >
                        <CommentList comments={comments} />
                    </Deferred>
                </div>
            </div>
        </AppLayout>
    );
}
