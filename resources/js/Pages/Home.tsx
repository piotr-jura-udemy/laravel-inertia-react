import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import { Post } from "@/types";
import { Link } from "@inertiajs/react";
import { Heart } from "lucide-react";
import PostMeta from "@/components/post-meta";

interface HomeProps {
    posts: Post[];
}

export default function Home({ posts }: HomeProps) {
    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Recent Posts
                    </h1>
                    <Link
                        href="/posts"
                        className="text-sm text-primary hover:underline"
                    >
                        View all
                    </Link>
                </div>
                {posts.length === 0 ? (
                    <Card>
                        <CardContent className="py-12 text-center text-muted-foreground">
                            No posts yet. Be the first to create one!
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {posts.map((post) => (
                            <Card key={post.id}>
                                <CardHeader className="space-y-2">
                                    <CardTitle>
                                        <Link href={`/posts/${post.id}`}>
                                            {post.title}
                                        </Link>
                                    </CardTitle>
                                    <PostMeta
                                        userId={post.user_id}
                                        userName={post.user?.name || "Unknown"}
                                        date={post.created_at}
                                    />
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-muted-foreground">
                                        {post.body.substring(0, 200)}
                                        {post.body.length > 200 && "..."}
                                    </p>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Heart size={16} />
                                        <span>
                                            {post.likes_count ?? 0} likes
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
