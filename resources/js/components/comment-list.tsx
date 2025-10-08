import { Comment } from "@/types";
import CommentCard from "./comment-card";
import LoadingCard from "./loading-card";
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "./ui/empty";
import { MessageSquare } from "lucide-react";

interface CommentListProps {
    comments?: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
    // Show loading state when comments is undefined
    if (comments === undefined) {
        return <LoadingCard message="Loading comments..." />;
    }

    if (comments.length === 0) {
        return (
            <Empty>
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <MessageSquare />
                    </EmptyMedia>
                    <EmptyTitle>No comments yet</EmptyTitle>
                    <EmptyDescription>
                        Be the first to share your thoughts on this post.
                    </EmptyDescription>
                </EmptyHeader>
            </Empty>
        );
    }

    return (
        <div className="space-y-4">
            {comments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
            ))}
        </div>
    );
}
