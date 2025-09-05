import AppLayout from "@/layouts/app-layout";
import { Post, Comment, User } from "@/types";
import { Form, router, Link, useForm } from "@inertiajs/react";
import { useState } from "react";

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
    const [isLiked, setIsLiked] = useState(user_liked);
    const [likesCount, setLikesCount] = useState(likes_count);
    const [isLiking, setIsLiking] = useState(false);

    const {
        data,
        setData,
        post: submitForm,
        processing,
        errors,
        reset,
    } = useForm({
        body: "",
    });

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submitForm(`/posts/${post.id}/comments`, {
            onSuccess: () => {
                reset();
            },
        });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (data.body.trim()) {
                handleCommentSubmit(e);
            }
        }
    };

    const handleLikeToggle = async () => {
        if (isLiking) return;

        setIsLiking(true);

        // Optimistic UI update
        const newLiked = !isLiked;
        const newCount = newLiked ? likesCount + 1 : likesCount - 1;
        setIsLiked(newLiked);
        setLikesCount(newCount);

        try {
            const response = await fetch(`/posts/${post.id}/toggle-like`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN":
                        document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute("content") || "",
                },
            });

            const data = await response.json();

            // Update with server response
            setIsLiked(data.liked);
            setLikesCount(data.likes_count);
        } catch (error) {
            // Revert optimistic update on error
            setIsLiked(!newLiked);
            setLikesCount(likesCount);
            console.error("Failed to toggle like:", error);
        } finally {
            setIsLiking(false);
        }
    };

    return (
        <AppLayout>
            <div className="max-w-4xl mx-auto">
                {/* Temporary user indicator */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-yellow-800">
                                <strong>Temp User:</strong> {current_user.name}
                            </span>
                        </div>
                        <Link
                            href="/temp-logout"
                            className="text-xs bg-yellow-200 hover:bg-yellow-300 px-2 py-1 rounded transition-colors"
                        >
                            Switch User
                        </Link>
                    </div>
                </div>
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
                        <button
                            onClick={handleLikeToggle}
                            disabled={isLiking}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                                isLiked
                                    ? "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                                    : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                            } ${
                                isLiking ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        >
                            <span className="text-lg">
                                {isLiked ? "❤️" : "🤍"}
                            </span>
                            <span>
                                {likesCount}{" "}
                                {likesCount === 1 ? "Like" : "Likes"}
                            </span>
                        </button>
                    </div>
                </article>

                {/* Comments section */}
                <div className="border-t pt-8">
                    <h2 className="text-2xl font-bold mb-6">
                        Comments ({comments.length})
                    </h2>

                    {/* Comment form */}
                    <div className="mb-8">
                        <form
                            onSubmit={handleCommentSubmit}
                            className="space-y-4"
                        >
                            <div>
                                <label
                                    htmlFor="body"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Add a comment
                                    <span className="text-xs text-gray-500 ml-2">
                                        (Press Enter to submit, Shift+Enter for
                                        new line)
                                    </span>
                                </label>
                                <textarea
                                    id="body"
                                    name="body"
                                    rows={3}
                                    value={data.body}
                                    onChange={(e) =>
                                        setData("body", e.target.value)
                                    }
                                    onKeyDown={handleKeyDown}
                                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                        errors.body
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    }`}
                                    placeholder="Write your comment..."
                                    disabled={processing}
                                />
                                {errors.body && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.body}
                                    </p>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={processing || !data.body.trim()}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? "Posting..." : "Post Comment"}
                            </button>
                        </form>
                    </div>

                    {/* Comments list */}
                    <div className="space-y-6">
                        {comments.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">
                                No comments yet. Be the first to comment!
                            </p>
                        ) : (
                            comments.map((comment) => (
                                <div
                                    key={comment.id}
                                    className="bg-gray-50 rounded-lg p-4"
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="font-medium text-gray-900">
                                            {comment.user.name}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            {new Date(
                                                comment.created_at
                                            ).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-gray-700">
                                        {comment.body}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
