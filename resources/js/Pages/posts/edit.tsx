import { update } from "@/actions/App/Http/Controllers/PostController";
import { InputError } from "@/components/input-error";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AppLayout from "@/layouts/app-layout";
import { Post } from "@/types";
import { Form } from "@inertiajs/react";

interface PostsEditProps {
    post: Post;
}

export default function PostsEdit({ post }: PostsEditProps) {
    return (
        <AppLayout>
            <Card>
                <CardHeader>
                    <CardTitle>Edit Post</CardTitle>
                    <CardDescription>Edit an existing post</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form action={update(post.id)} className="space-y-4">
                        {({ errors }) => (
                            <>
                                <div className="space-y-1">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        name="title"
                                        type="text"
                                        aria-invalid={!!errors.title}
                                        defaultValue={post.title}
                                    />
                                    <InputError message={errors.title} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="body">Body</Label>
                                    <Textarea
                                        id="body"
                                        name="body"
                                        aria-invalid={!!errors.body}
                                        defaultValue={post.body}
                                    />
                                    <InputError message={errors.body} />
                                </div>
                                <Button>Update</Button>
                            </>
                        )}
                    </Form>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
