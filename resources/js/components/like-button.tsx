import { router } from "@inertiajs/react";
import { Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface LikeButtonProps {
    postId: number;
    initialCount: number;
    initialLiked: boolean;
    isLoading?: boolean;
}

export default function LikeButton({
    postId,
    initialCount,
    initialLiked,
    isLoading: externalLoading = false,
}: LikeButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
    const disabled = isLoading || externalLoading;

    const handleToggleLike = () => {
        if (disabled) return;

        setIsLoading(true);

        router.post(
            `/posts/${postId}/like/toggle`,
            {},
            {
                onSuccess: () => toast(initialLiked ? "Unliked!" : "Liked!"),
                onError: () => toast.error("Failed to update like"),
                onFinish: () => setIsLoading(false),
                only: ["likes"], // Only reload likes data, not comments
            }
        );
    };

    return (
        <button
            onClick={handleToggleLike}
            disabled={disabled}
            className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors",
                initialLiked
                    ? "bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
                    : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100",
                disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
            )}
        >
            <Heart
                size={16}
                className={cn(
                    "transition-all",
                    initialLiked ? "fill-red-500 text-red-500" : "text-gray-500"
                )}
            />
            <span className="text-sm font-medium">{initialCount}</span>
        </button>
    );
}
