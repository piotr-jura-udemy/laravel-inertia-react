import { Form } from "@inertiajs/react";
import { useState } from "react";

interface CommentFormProps {
    postId: number;
}

export default function CommentForm({ postId }: CommentFormProps) {
    const [body, setBody] = useState("");

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLTextAreaElement>,
        submit: () => void
    ) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (body.trim()) {
                submit();
            }
        }
    };

    return (
        <div className="mb-8">
            <Form
                action={`/posts/${postId}/comments`}
                method="post"
                onSuccess={() => setBody("")}
                className="space-y-4"
            >
                {({ errors, processing, submit }) => (
                    <>
                        <div>
                            <label
                                htmlFor="body"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Add a comment
                                <span className="text-xs text-gray-500 ml-2">
                                    (Press Enter to submit, Shift+Enter for new
                                    line)
                                </span>
                            </label>
                            <textarea
                                id="body"
                                name="body"
                                rows={3}
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e, submit)}
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
                            disabled={processing || !body.trim()}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? "Posting..." : "Post Comment"}
                        </button>
                    </>
                )}
            </Form>
        </div>
    );
}
