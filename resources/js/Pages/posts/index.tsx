import AppLayout from "@/layouts/app-layout";
import { Post } from "@/types";
import { Link } from "@inertiajs/react";

interface PostsIndexProps {
    posts: Post[];
}

export default function PostsIndex({ posts }: PostsIndexProps) {
    return (
        <AppLayout>
            <div className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-900">Posts</h1>
                {posts.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500">No posts found.</p>
                    </div>
                ) : (
                    <div>
                        {posts.map((post) => (
                            <article
                                key={post.id}
                                className="border-b border-gray-200 pb-6 last:border-b-0"
                            >
                                <h2 className="text-xl font-semibold mb-2">
                                    <Link href={`/posts/${post.id}`}>
                                        {post.title}
                                    </Link>
                                </h2>
                                <p className="text-gray-600">
                                    {post.body.substring(0, 200)}
                                    {post.body.length > 200 && "..."}
                                </p>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
