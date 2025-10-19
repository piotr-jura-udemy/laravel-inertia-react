import AppLayout from "@/layouts/app-layout";
import { Comment, Post, PostLikesData } from "@/types";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import CommentForm from "@/components/comment-form";
import {
    Deferred,
    InfiniteScroll,
    router,
    usePage,
    usePoll,
} from "@inertiajs/react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import CommentList from "@/components/comment-list";
import LikeButton from "@/components/like-button";
import PostActionsDropdown from "@/components/post-actions-dropdown";

interface PostsShowProps {
    post: Post;
    comments: {
        data: Comment[];
    };
    likes: PostLikesData;
    comments_count?: number;
    can: {
        update: boolean;
        delete: boolean;
    };
}

export default function PostsShow({
    post,
    comments,
    likes,
    comments_count,
    can,
}: PostsShowProps) {
    const commentsSectionRef = useRef<HTMLDivElement>(null);
    // useState - displayed on the page
    // useRef   - internal logic
    const commentCountRef = useRef(comments_count ?? 0);
    const iAmWritingComment = useRef(false);
    const { url } = usePage();

    const scrollToComments = () =>
        commentsSectionRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });

    usePoll(3_000, {
        only: ["comments_count", "likes"],
    });

    // undefined => 0 => 0 => 1 => 1 => 1 => 3
    useEffect(() => {
        // Current length of comments []
        const newCommentCount = comments_count ?? 0;
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
                    onClick: () => {
                        router.visit(url, {
                            only: ["comments"],
                            reset: ["comments"],
                            preserveScroll: false,
                            onSuccess: () => scrollToComments(),
                        });
                    },
                },
            });
        }
        // And we update the previous length = current length
        commentCountRef.current = newCommentCount;
        iAmWritingComment.current = false;
    }, [comments_count]);

    const handleCommentAdded = () => {
        iAmWritingComment.current = true;
        toast("Comment has been added", {
            description: "Your comment is already live and visible",
        });
        router.visit(url, {
            only: ["comments"],
            reset: ["comments"],
            preserveState: true,
        });
    };

    return (
        <AppLayout>
            <div className="space-y-6">
                {/* Post Content */}
                <Card className="rounded-none">
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div>
                                {" "}
                                <CardTitle className="text-2xl">
                                    {post.title}
                                </CardTitle>
                                <CardDescription>
                                    By {post.user?.name} on{" "}
                                    {new Date(
                                        post.created_at
                                    ).toLocaleDateString()}
                                </CardDescription>
                            </div>
                            <PostActionsDropdown
                                postId={post.id}
                                canUpdate={can.update}
                                canDelete={can.delete}
                            />
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-gray-700 whitespace-pre-wrap">
                            {post.body}
                        </p>
                        <Deferred
                            data="likes"
                            fallback={
                                <LikeButton
                                    postId={post.id}
                                    count={likes?.count}
                                    liked={likes?.user_has_liked}
                                    isLoading={!likes}
                                />
                            }
                        >
                            <LikeButton
                                postId={post.id}
                                count={likes?.count}
                                liked={likes?.user_has_liked}
                            />
                        </Deferred>
                    </CardContent>
                </Card>

                {/* Comment Form */}
                <CommentForm
                    postId={post.id}
                    onCommentAdded={handleCommentAdded}
                />

                {/* Comments Section */}
                <div ref={commentsSectionRef}>
                    <InfiniteScroll data="comments">
                        <CommentList comments={comments.data} />
                    </InfiniteScroll>
                </div>
            </div>
        </AppLayout>
    );
}
