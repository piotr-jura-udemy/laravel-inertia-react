import { useState } from "react";
import { router } from "@inertiajs/react";

interface LikeButtonProps {
    postId: number;
    initialLiked: boolean;
    initialCount: number;
}

export default function LikeButton({
    postId,
    initialLiked,
    initialCount,
}: LikeButtonProps) {
    const [isLiked, setIsLiked] = useState(initialLiked);
    const [likesCount, setLikesCount] = useState(initialCount);
    const [isLiking, setIsLiking] = useState(false);

    const handleLikeToggle = () => {
        if (isLiking) return;

        setIsLiking(true);

        // Optimistic UI update
        const newLiked = !isLiked;
        const newCount = newLiked ? likesCount + 1 : likesCount - 1;
        setIsLiked(newLiked);
        setLikesCount(newCount);

        router.post(
            `/posts/${postId}/toggle-like`,
            {},
            {
                preserveState: true,
                preserveScroll: true,
                only: [], // Don't reload any props since we're handling state locally
                onSuccess: () => {
                    // Keep the optimistic update - no need to sync with server
                    // since we're using optimistic UI
                },
                onError: (errors) => {
                    // Revert optimistic update on error
                    setIsLiked(!newLiked);
                    setLikesCount(likesCount);
                    console.error("Failed to toggle like:", errors);
                },
                onFinish: () => {
                    setIsLiking(false);
                },
            }
        );
    };

    return (
        <button
            onClick={handleLikeToggle}
            disabled={isLiking}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                isLiked
                    ? "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
            } ${isLiking ? "opacity-50 cursor-not-allowed" : ""}`}
        >
            <span className="text-lg">{isLiked ? "❤️" : "🤍"}</span>
            <span>
                {likesCount} {likesCount === 1 ? "Like" : "Likes"}
            </span>
        </button>
    );
}
