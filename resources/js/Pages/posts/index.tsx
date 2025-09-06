import AppLayout from "@/layouts/app-layout";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Post } from "@/types";
import { Link } from "@inertiajs/react";

interface PostsIndexProps {
    posts: Post[];
}

export default function PostsIndex({ posts }: PostsIndexProps) {
    return (
        <AppLayout>
            <div className="space-y-6">
                {posts.length === 0 ? (
                    <Card>
                        <CardContent className="flex items-center justify-center py-12">
                            <p className="text-muted-foreground">
                                No posts found.
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {posts.map((post) => (
                            <Card
                                key={post.id}
                                className="transition-colors hover:bg-muted/50"
                            >
                                <CardHeader>
                                    <CardTitle className="text-xl">
                                        <Link
                                            href={`/posts/${post.id}`}
                                            className="hover:underline"
                                        >
                                            {post.title}
                                        </Link>
                                    </CardTitle>
                                    <CardDescription>
                                        By {post.user.name}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        {post.body.substring(0, 200)}
                                        {post.body.length > 200 && "..."}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
