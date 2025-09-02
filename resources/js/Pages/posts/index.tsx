import AppLayout from "@/layouts/app-layout";
import { Post } from "@/types";
import { Link } from "@inertiajs/react";

interface PostsIndexProps {
    posts: Post[];
}

export default function PostsIndex({ posts }: PostsIndexProps) {
    return (
        <AppLayout>
            <h1>Posts</h1>
            {posts.length === 0 ? (
                <div>
                    <p>No posts found.</p>
                </div>
            ) : (
                <div>
                    {posts.map((post) => (
                        <div>
                            <h2>
                                <Link href={`/posts/${post.id}`}>
                                    {post.title}
                                </Link>
                            </h2>
                            <p>
                                {post.body.substring(0, 200)}
                                {post.body.length > 200 && "..."}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </AppLayout>
    );
}
