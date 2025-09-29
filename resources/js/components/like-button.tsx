import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface LikeButtonProps {
    postId: number;
    count?: number;
    liked?: boolean;
    isLoading?: boolean;
}

export default function LikeButton({
    postId,
    count = 0,
    liked = false,
    isLoading = false,
}: LikeButtonProps) {
    const handleToggleLike = () => {
        // TODO: Implement like toggle logic
    };

    return (
        <button
            onClick={handleToggleLike}
            disabled={isLoading}
            className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors",
                liked
                    ? "bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
                    : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100",
                isLoading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
            )}
        >
            <Heart
                size={16}
                className={cn(
                    "transition-all",
                    liked ? "fill-red-500 text-red-500" : "text-gray-500"
                )}
            />
            <span className="text-sm font-medium">{count}</span>
        </button>
    );
}
