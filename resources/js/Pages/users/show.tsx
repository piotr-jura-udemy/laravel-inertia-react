import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppLayout from "@/layouts/app-layout";
import { Comment, Post, User, PageProps } from "@/types";
import {
    Calendar,
    FileText,
    MessageSquare,
    Heart,
    Loader2,
} from "lucide-react";
import PostCard from "@/components/post-card";
import CommentCard from "@/components/comment-card";
import LikedContentCard from "@/components/liked-content-card";
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { WhenVisible, router, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";

interface UserShowProps {
    profileUser: User;
    posts?: Post[];
    comments?: Comment[];
    likes?: Array<{
        type: "post" | "comment";
        data: Post | Comment;
    }>;
}

export default function UserShow({
    profileUser,
    posts,
    comments,
    likes,
}: UserShowProps) {
    const { auth } = usePage<PageProps>().props;

    const handleFollow = () => {
        router.post(`/users/${profileUser.id}/follow`);
    };

    return (
        <AppLayout>
            <div>
                {/* Profile Header */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            {/* Avatar Placeholder */}
                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xl font-bold shrink-0">
                                {profileUser.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                                <CardTitle className="text-xl">
                                    {profileUser.name}
                                </CardTitle>
                                <CardDescription className="flex items-center gap-2 text-xs">
                                    <Calendar size={12} />
                                    Joined{" "}
                                    {new Date(
                                        profileUser.created_at
                                    ).toLocaleDateString("en-US", {
                                        month: "short",
                                        year: "numeric",
                                    })}
                                    <span className="ml-2">
                                        {profileUser.followers_count ?? 0}{" "}
                                        followers ·{" "}
                                        {profileUser.following_count ?? 0}{" "}
                                        following
                                    </span>
                                </CardDescription>
                            </div>
                            {auth.user && auth.user.id !== profileUser.id && (
                                <Button
                                    onClick={handleFollow}
                                    variant={
                                        profileUser.is_following
                                            ? "outline"
                                            : "default"
                                    }
                                >
                                    {profileUser.is_following
                                        ? "Unfollow"
                                        : "Follow"}
                                </Button>
                            )}
                        </div>
                    </CardHeader>
                </Card>

                {/* Tabs */}
                <Tabs defaultValue="posts" className="mt-2">
                    <TabsList>
                        <TabsTrigger value="posts">Posts</TabsTrigger>
                        <TabsTrigger value="replies">Replies</TabsTrigger>
                        <TabsTrigger value="likes">Likes</TabsTrigger>
                    </TabsList>

                    <TabsContent value="posts">
                        <WhenVisible
                            data="posts"
                            fallback={
                                <Empty>
                                    <EmptyHeader>
                                        <EmptyMedia variant="icon">
                                            <Loader2 className="animate-spin" />
                                        </EmptyMedia>
                                        <EmptyTitle>Loading...</EmptyTitle>
                                    </EmptyHeader>
                                </Empty>
                            }
                        >
                            {!posts ? (
                                <Empty>
                                    <EmptyHeader>
                                        <EmptyMedia variant="icon">
                                            <Loader2 className="animate-spin" />
                                        </EmptyMedia>
                                        <EmptyTitle>Loading...</EmptyTitle>
                                    </EmptyHeader>
                                </Empty>
                            ) : posts.length === 0 ? (
                                <Empty>
                                    <EmptyHeader>
                                        <EmptyMedia variant="icon">
                                            <FileText />
                                        </EmptyMedia>
                                        <EmptyTitle>No posts yet</EmptyTitle>
                                        <EmptyDescription>
                                            {profileUser.name} hasn't created
                                            any posts yet.
                                        </EmptyDescription>
                                    </EmptyHeader>
                                </Empty>
                            ) : (
                                <div className="space-y-4">
                                    {posts.map((post) => (
                                        <PostCard
                                            key={post.id}
                                            post={post}
                                            variant="minimal"
                                        />
                                    ))}
                                </div>
                            )}
                        </WhenVisible>
                    </TabsContent>

                    <TabsContent value="replies">
                        <WhenVisible
                            data="comments"
                            fallback={
                                <Empty>
                                    <EmptyHeader>
                                        <EmptyMedia variant="icon">
                                            <Loader2 className="animate-spin" />
                                        </EmptyMedia>
                                        <EmptyTitle>Loading...</EmptyTitle>
                                    </EmptyHeader>
                                </Empty>
                            }
                        >
                            {!comments ? (
                                <Empty>
                                    <EmptyHeader>
                                        <EmptyMedia variant="icon">
                                            <Loader2 className="animate-spin" />
                                        </EmptyMedia>
                                        <EmptyTitle>Loading...</EmptyTitle>
                                    </EmptyHeader>
                                </Empty>
                            ) : comments.length === 0 ? (
                                <Empty>
                                    <EmptyHeader>
                                        <EmptyMedia variant="icon">
                                            <MessageSquare />
                                        </EmptyMedia>
                                        <EmptyTitle>No replies yet</EmptyTitle>
                                        <EmptyDescription>
                                            {profileUser.name} hasn't replied to
                                            any posts yet.
                                        </EmptyDescription>
                                    </EmptyHeader>
                                </Empty>
                            ) : (
                                <div className="space-y-4">
                                    {comments.map((comment) => (
                                        <CommentCard
                                            key={comment.id}
                                            comment={comment}
                                            variant="with-context"
                                        />
                                    ))}
                                </div>
                            )}
                        </WhenVisible>
                    </TabsContent>

                    <TabsContent value="likes">
                        <WhenVisible
                            data="likes"
                            fallback={
                                <Empty>
                                    <EmptyHeader>
                                        <EmptyMedia variant="icon">
                                            <Loader2 className="animate-spin" />
                                        </EmptyMedia>
                                        <EmptyTitle>Loading...</EmptyTitle>
                                    </EmptyHeader>
                                </Empty>
                            }
                        >
                            {!likes ? (
                                <Empty>
                                    <EmptyHeader>
                                        <EmptyMedia variant="icon">
                                            <Loader2 className="animate-spin" />
                                        </EmptyMedia>
                                        <EmptyTitle>Loading...</EmptyTitle>
                                    </EmptyHeader>
                                </Empty>
                            ) : likes.length === 0 ? (
                                <Empty>
                                    <EmptyHeader>
                                        <EmptyMedia variant="icon">
                                            <Heart />
                                        </EmptyMedia>
                                        <EmptyTitle>No likes yet</EmptyTitle>
                                        <EmptyDescription>
                                            {profileUser.name} hasn't liked any
                                            content yet.
                                        </EmptyDescription>
                                    </EmptyHeader>
                                </Empty>
                            ) : (
                                <div className="space-y-4">
                                    {likes.map((like, index) => {
                                        if (like.type === "post") {
                                            return (
                                                <LikedContentCard
                                                    key={`post-${index}`}
                                                    type="post"
                                                    data={like.data as Post}
                                                />
                                            );
                                        }
                                        return (
                                            <LikedContentCard
                                                key={`comment-${index}`}
                                                type="comment"
                                                data={like.data as Comment}
                                            />
                                        );
                                    })}
                                </div>
                            )}
                        </WhenVisible>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
