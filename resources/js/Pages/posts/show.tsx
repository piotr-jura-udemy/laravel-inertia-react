import AppLayout from "@/layouts/app-layout";
import { Post, Comment, User } from "@/types";
import { Head } from "@inertiajs/react";
import LikeButton from "@/components/like-button";
import CommentForm from "@/components/comment-form";
import CommentList from "@/components/comment-list";
import TempUserIndicator from "@/components/temp-user-indicator";

interface PostsShowProps {
    post: Post;
    comments: Comment[];
    likes_count: number;
    user_liked: boolean;
    current_user: User;
}

export default function PostsShow({
    post,
    comments,
    likes_count,
    user_liked,
    current_user,
}: PostsShowProps) {
    return (
        <AppLayout>
            <Head title={post.title} />

            <div className="max-w-4xl mx-auto">
                <TempUserIndicator user={current_user} />

                {/* Post content */}
                <article className="mb-8">
                    <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                    <p className="text-sm text-gray-500 mb-4">
                        By {post.user.name}
                    </p>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        {post.body}
                    </p>

                    {/* Like button */}
                    <div className="flex items-center gap-4 mb-8">
                        <LikeButton
                            postId={post.id}
                            initialLiked={user_liked}
                            initialCount={likes_count}
                        />
                    </div>
                </article>

                {/* Comments section */}
                <div className="border-t pt-8">
                    <h2 className="text-2xl font-bold mb-6">
                        Comments ({comments.length})
                    </h2>

                    <CommentForm postId={post.id} />
                    <CommentList comments={comments} />
                </div>
            </div>
        </AppLayout>
    );
}
