import AppLayout from "@/layouts/app-layout";
import { Post } from "@/types";
import { Link } from "@inertiajs/react";
import PostCard from "@/components/post-card";
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { Pencil } from "lucide-react";

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
                    <Empty>
                        <EmptyHeader>
                            <EmptyMedia variant="icon">
                                <Pencil />
                            </EmptyMedia>
                            <EmptyTitle>No posts yet</EmptyTitle>
                            <EmptyDescription>
                                Be the first to create a post and share your
                                thoughts with the community.
                            </EmptyDescription>
                        </EmptyHeader>
                    </Empty>
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
