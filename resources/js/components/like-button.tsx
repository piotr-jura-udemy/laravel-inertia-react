import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { create as loginPage } from "@/actions/App/Http/Controllers/Auth/LoginController";
import { toast } from "sonner";
import { PageProps } from "@/types";

interface LikeButtonProps {
    type: "posts" | "comments";
    id: number;
    count?: number;
    liked?: boolean;
    isLoading?: boolean;
}

export default function LikeButton({
    type,
    id,
    count = 0,
    liked = false,
    isLoading: externalLoading = false,
}: LikeButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
    const disabled = isLoading || externalLoading;
    const { auth } = usePage<PageProps>().props;

    const handleToggleLike = () => {
        if (disabled) return;

        if (!auth.user) {
            router.visit(loginPage().url);
            return;
        }

        const itemName = type === "posts" ? "Post" : "Comment";

        router.post(
            `/${type}/${id}/likes/toggle`,
            {},
            {
                preserveScroll: true,
                onStart: () => setIsLoading(true),
                onSuccess: () =>
                    toast(
                        liked ? `${itemName} unliked!` : `${itemName} liked!`
                    ),
                onError: () => toast("Failed to update like"),
                onFinish: () => setIsLoading(false),
                only: ["likes", "comments"],
            }
        );
    };

    return (
        <button
            onClick={handleToggleLike}
            disabled={disabled}
            className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors",
                liked
                    ? "bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
                    : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100",
                disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
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
