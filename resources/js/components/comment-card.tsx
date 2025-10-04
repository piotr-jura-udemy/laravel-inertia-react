import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Comment } from "@/types";
import LikeButton from "./like-button";

interface CommentCardProps {
    comment: Comment;
}

export default function CommentCard({ comment }: CommentCardProps) {
    return (
        <Card className="rounded-none border-b-0 last:border-b">
            <CardHeader>
                <CardTitle className="text-base">
                    {comment.user?.name}
                </CardTitle>
                <CardDescription>
                    {new Date(comment.created_at).toLocaleDateString()}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                <p>{comment.body}</p>
                {comment.likes_data && (
                    <LikeButton
                        type="comments"
                        id={comment.id}
                        count={comment.likes_data.count}
                        liked={comment.likes_data.user_has_liked}
                    />
                )}
            </CardContent>
        </Card>
    );
}
