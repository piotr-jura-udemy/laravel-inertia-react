import AppLayout from "@/layouts/app-layout";
import { Post } from "@/types";
import { Link } from "@inertiajs/react";
import PostCard from "@/components/post-card";
import EmptyState from "@/components/empty-state";

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
                    <EmptyState message="No posts yet. Be the first to create one!" />
                ) : (
                    <div className="space-y-4">
                        {posts.map((post) => (
                            <PostCard
                                key={post.id}
                                post={post}
                                variant="compact"
                            />
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
