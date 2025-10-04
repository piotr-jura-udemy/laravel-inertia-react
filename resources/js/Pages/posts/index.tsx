import AppLayout from "@/layouts/app-layout";
import { Post } from "@/types";
import PostCard from "@/components/post-card";
import EmptyState from "@/components/empty-state";

interface PostsIndexProps {
    posts: Post[];
}

export default function PostsIndex({ posts }: PostsIndexProps) {
    return (
        <AppLayout>
            <div className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-900">Posts</h1>
                {posts.length === 0 ? (
                    <EmptyState message="No posts found." />
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
