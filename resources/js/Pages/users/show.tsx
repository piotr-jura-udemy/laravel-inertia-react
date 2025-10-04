import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppLayout from "@/layouts/app-layout";
import { Comment, Post, User } from "@/types";
import { Calendar } from "lucide-react";
import PostCard from "@/components/post-card";
import CommentCard from "@/components/comment-card";
import LikedContentCard from "@/components/liked-content-card";
import EmptyState from "@/components/empty-state";

interface UserShowProps {
    profileUser: User;
    posts: Post[];
    comments: Comment[];
    likes: Array<{
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
    return (
        <AppLayout>
            <div>
                {/* Profile Header */}
                <Card className="rounded-none">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            {/* Avatar Placeholder */}
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xl font-bold shrink-0">
                                {profileUser.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                                <CardTitle className="text-xl">
                                    {profileUser.name}
                                </CardTitle>
                                <CardDescription className="flex items-center gap-1 text-xs">
                                    <Calendar size={12} />
                                    Joined{" "}
                                    {new Date(
                                        profileUser.created_at
                                    ).toLocaleDateString("en-US", {
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                </Card>

                {/* Tabs */}
                <Tabs defaultValue="posts" className="mt-3">
                    <TabsList>
                        <TabsTrigger value="posts">Posts</TabsTrigger>
                        <TabsTrigger value="replies">Replies</TabsTrigger>
                        <TabsTrigger value="likes">Likes</TabsTrigger>
                    </TabsList>

                    <TabsContent value="posts">
                        {posts.length === 0 ? (
                            <EmptyState message="No posts yet" />
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
                    </TabsContent>

                    <TabsContent value="replies">
                        {comments.length === 0 ? (
                            <EmptyState message="No replies yet" />
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
                    </TabsContent>

                    <TabsContent value="likes">
                        {likes.length === 0 ? (
                            <EmptyState message="No likes yet" />
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
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
