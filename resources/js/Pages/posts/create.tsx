import { store } from "@/actions/App/Http/Controllers/PostController";
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
import { Form } from "@inertiajs/react";

export default function PostsCreate() {
    return (
        <AppLayout>
            <Card>
                <CardHeader>
                    <CardTitle>Create Post</CardTitle>
                    <CardDescription>Create a new post</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form action={store()} className="space-y-4">
                        {({ errors }) => (
                            <>
                                <div className="space-y-1">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        name="title"
                                        type="text"
                                        aria-invalid={!!errors.title}
                                    />
                                    <InputError message={errors.title} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="body">Body</Label>
                                    <Textarea
                                        id="body"
                                        name="body"
                                        aria-invalid={!!errors.body}
                                    />
                                    <InputError message={errors.body} />
                                </div>
                                <Button>Create</Button>
                            </>
                        )}
                    </Form>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
