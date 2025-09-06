import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Form } from "@inertiajs/react";

export default function PostsCreate() {
    return (
        <AppLayout>
            <div className="space-y-6">
                <h1 className="text-2xl font-bold tracking-tight">
                    Create Post
                </h1>
                <Form action="/posts" method="post" className="space-y-6">
                    {({ errors }) => (
                        <>
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    type="text"
                                    className={cn(
                                        errors.title &&
                                            "border-destructive focus-visible:ring-destructive/20"
                                    )}
                                    aria-invalid={!!errors.title}
                                />
                                {errors.title && (
                                    <p className="text-sm text-destructive">
                                        {errors.title}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="body">Body</Label>
                                <Textarea
                                    id="body"
                                    name="body"
                                    rows={6}
                                    className={cn(
                                        errors.body &&
                                            "border-destructive focus-visible:ring-destructive/20"
                                    )}
                                    aria-invalid={!!errors.body}
                                />
                                {errors.body && (
                                    <p className="text-sm text-destructive">
                                        {errors.body}
                                    </p>
                                )}
                            </div>
                            <Button type="submit" className="w-full sm:w-auto">
                                Create Post
                            </Button>
                        </>
                    )}
                </Form>
            </div>
        </AppLayout>
    );
}
