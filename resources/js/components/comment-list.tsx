import { Comment } from "@/types";

interface CommentListProps {
    comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
    if (comments.length === 0) {
        return (
            <p className="text-gray-500 text-center py-8">
                No comments yet. Be the first to comment!
            </p>
        );
    }

    return (
        <div className="space-y-6">
            {comments.map((comment) => (
                <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-gray-900">
                            {comment.user.name}
                        </span>
                        <span className="text-sm text-gray-500">
                            {new Date(comment.created_at).toLocaleDateString()}
                        </span>
                    </div>
                    <p className="text-gray-700">{comment.body}</p>
                </div>
            ))}
        </div>
    );
}
