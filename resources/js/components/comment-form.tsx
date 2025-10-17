import { InputError } from "@/components/input-error";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Form } from "@inertiajs/react";
import { Input } from "./ui/input";
import { store } from "@/actions/App/Http/Controllers/CommentController";

interface CommentFormProps {
    postId: number;
    onCommentAdded?: () => void;
}

export default function CommentForm({
    postId,
    onCommentAdded,
}: CommentFormProps) {
    return (
        <Card className="rounded-none">
            <CardHeader>
                <CardTitle>Add Comment</CardTitle>
                <CardDescription>
                    Share your thoughts about this post
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form
                    action={store()}
                    className="space-y-4"
                    resetOnSuccess
                    onSuccess={() => {
                        onCommentAdded?.();
                    }}
                >
                    {({ errors, processing }) => (
                        <>
                            <Input
                                type="hidden"
                                name="post_id"
                                value={postId}
                            />
                            <div className="space-y-1">
                                <Textarea
                                    id="body"
                                    name="body"
                                    placeholder="Write your comment here..."
                                    aria-invalid={!!errors.body}
                                />
                                <InputError message={errors.body} />
                            </div>
                            <Button type="submit" disabled={processing}>
                                {processing
                                    ? "Adding Comment..."
                                    : "Add Comment"}
                            </Button>
                        </>
                    )}
                </Form>
            </CardContent>
        </Card>
    );
}
