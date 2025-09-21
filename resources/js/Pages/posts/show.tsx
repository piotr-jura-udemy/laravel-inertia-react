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
import CommentList from "@/components/comment-list";
import { Deferred, usePoll } from "@inertiajs/react";
import { useRef, useEffect, useState } from "react";
import { toast } from "sonner";

interface PostsShowProps {
    post: Post;
    comments: Comment[];
}

export default function PostsShow({ post, comments }: PostsShowProps) {
    const commentsSectionRef = useRef<HTMLDivElement>(null);
    const [previousCommentsCount, setPreviousCommentsCount] = useState(
        comments?.length || 0
    );
    const [userJustAddedComment, setUserJustAddedComment] = useState(false);

    // Poll for updates every 10 seconds - only reload comments data
    usePoll(10000, {
        only: ["comments"],
    });

    // Track new comments and show notification
    useEffect(() => {
        const currentCommentsCount = comments?.length || 0;
        const newCommentsCount = currentCommentsCount - previousCommentsCount;

        if (
            newCommentsCount > 0 &&
            previousCommentsCount > 0 &&
            !userJustAddedComment
        ) {
            toast(
                `${newCommentsCount} new comment${
                    newCommentsCount > 1 ? "s" : ""
                } available`,
                {
                    description: "Fresh comments just loaded!",
                    duration: 3000,
                }
            );
        }

        // Reset the flag after processing
        if (userJustAddedComment) {
            setUserJustAddedComment(false);
        }

        setPreviousCommentsCount(currentCommentsCount);
    }, [comments, previousCommentsCount, userJustAddedComment]);

    const handleCommentAdded = () => {
        setUserJustAddedComment(true);
        toast("Comment has been added", {
            description: "Your comment is already live and visible",
        });
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
                        fallback={<CommentList comments={comments || []} />}
                    >
                        <CommentList comments={comments} />
                    </Deferred>
                </div>
            </div>
        </AppLayout>
    );
}
