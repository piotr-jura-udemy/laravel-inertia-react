import AppLayout from "@/layouts/app-layout";
import { Post } from "@/types";
import PostCard from "@/components/post-card";
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { FileText } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { router } from "@inertiajs/react";

interface PostsIndexProps {
    posts: Post[];
    currentView: string;
}

export default function PostsIndex({
    posts,
    currentView = "all",
}: PostsIndexProps) {
    const handleViewChange = (view: string) => {
        router.get("/posts", { view }, { preserveState: true });
    };

    return (
        <AppLayout>
            <div className="space-y-6">
                <Tabs value={currentView} onValueChange={handleViewChange}>
                    <TabsList>
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="followed">Followed</TabsTrigger>
                        <TabsTrigger value="popular">Popular</TabsTrigger>
                    </TabsList>
                </Tabs>
                {posts.length === 0 ? (
                    <Empty>
                        <EmptyHeader>
                            <EmptyMedia variant="icon">
                                <FileText />
                            </EmptyMedia>
                            <EmptyTitle>No posts found</EmptyTitle>
                            <EmptyDescription>
                                There are no posts to display at the moment.
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
