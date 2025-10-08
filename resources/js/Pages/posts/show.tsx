import AppLayout from "@/layouts/app-layout";
import { Comment, Post, PostLikesData } from "@/types";
import CommentForm from "@/components/comment-form";
import { Deferred, usePoll } from "@inertiajs/react";
import { useRef } from "react";
import CommentList from "@/components/comment-list";
import PostCard from "@/components/post-card";
import { useCommentNotifications } from "@/hooks/use-comment-notifications";

interface PostsShowProps {
    post: Post;
    comments: Comment[];
    likes: PostLikesData;
}

export default function PostsShow({ post, comments, likes }: PostsShowProps) {
    const commentsSectionRef = useRef<HTMLDivElement>(null);

    const scrollToComments = () =>
        commentsSectionRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });

    usePoll(30_000, {
        only: ["comments", "likes"],
    });

    const { handleCommentAdded } = useCommentNotifications(
        comments,
        scrollToComments
    );

    return (
        <AppLayout>
            <div className="space-y-6">
                <PostCard post={post} likes={likes} />

                <CommentForm
                    postId={post.id}
                    onCommentAdded={handleCommentAdded}
                />

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
