import { Like } from "@/types";
import { Heart, Loader2 } from "lucide-react";
import LikeButton from "./like-button";

interface LikeBarProps {
    postId: number;
    likes?: Like;
}

export default function LikeBar({ postId, likes }: LikeBarProps) {
    return (
        <LikeButton
            postId={postId}
            initialCount={likes?.count ?? 0}
            initialLiked={likes?.user_has_liked ?? false}
            isLoading={!likes}
        />
    );
}
