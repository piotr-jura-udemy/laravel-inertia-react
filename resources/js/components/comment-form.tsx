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
import { Form, usePage } from "@inertiajs/react";
import { Input } from "./ui/input";
import { store } from "@/actions/App/Http/Controllers/CommentController";
import { MessageCircle } from "lucide-react";
import SignInPrompt from "./sign-in-prompt";
import { PageProps } from "@/types";

interface CommentFormProps {
    postId: number;
    onCommentAdded?: () => void;
}

export default function CommentForm({
    postId,
    onCommentAdded,
}: CommentFormProps) {
    const { auth } = usePage<PageProps>().props;
    if (!auth.user) {
        return (
            <SignInPrompt
                icon={MessageCircle}
                message="Want to share your thoughts?"
                actionText="Sign in to comment"
            />
        );
    }

    return (
        <Card>
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
                    onSuccess={() => onCommentAdded?.()}
                    options={{
                        only: ["comments"],
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
