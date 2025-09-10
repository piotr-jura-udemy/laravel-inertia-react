import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Comment } from "@/types";

interface CommentCardProps {
    comment: Comment;
}

export default function CommentCard({ comment }: CommentCardProps) {
    return (
        <Card className="rounded-none border-b-0 last:border-b">
            <CardHeader>
                <CardTitle className="text-base">{comment.user.name}</CardTitle>
                <CardDescription>
                    {new Date(comment.created_at).toLocaleDateString()}
                </CardDescription>
            </CardHeader>
            <CardContent>{comment.body}</CardContent>
        </Card>
    );
}
