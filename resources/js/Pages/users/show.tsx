import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppLayout from "@/layouts/app-layout";
import { Comment, Post, User, PageProps } from "@/types";
import { FileText, MessageSquare, Heart } from "lucide-react";
import PostCard from "@/components/post-card";
import CommentCard from "@/components/comment-card";
import LikedContentCard from "@/components/liked-content-card";
import UserProfileHeader from "@/components/user-profile-header";
import UserTabContent from "@/components/user-tab-content";
import { router, usePage } from "@inertiajs/react";

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
                <UserProfileHeader
                    user={profileUser}
                    isOwnProfile={auth.user?.id === profileUser.id}
                    onFollow={handleFollow}
                />

                <Tabs defaultValue="posts" className="mt-2">
                    <TabsList>
                        <TabsTrigger value="posts">Posts</TabsTrigger>
                        <TabsTrigger value="replies">Replies</TabsTrigger>
                        <TabsTrigger value="likes">Likes</TabsTrigger>
                    </TabsList>

                    <TabsContent value="posts">
                        <UserTabContent
                            dataKey="posts"
                            data={posts}
                            emptyIcon={FileText}
                            emptyTitle="No posts yet"
                            emptyMessage={`${profileUser.name} hasn't created any posts yet.`}
                            renderItems={(posts) =>
                                posts.map((post) => (
                                    <PostCard
                                        key={post.id}
                                        post={post}
                                        variant="minimal"
                                    />
                                ))
                            }
                        />
                    </TabsContent>

                    <TabsContent value="replies">
                        <UserTabContent
                            dataKey="comments"
                            data={comments}
                            emptyIcon={MessageSquare}
                            emptyTitle="No replies yet"
                            emptyMessage={`${profileUser.name} hasn't replied to any posts yet.`}
                            renderItems={(comments) =>
                                comments.map((comment) => (
                                    <CommentCard
                                        key={comment.id}
                                        comment={comment}
                                        variant="with-context"
                                    />
                                ))
                            }
                        />
                    </TabsContent>

                    <TabsContent value="likes">
                        <UserTabContent
                            dataKey="likes"
                            data={likes}
                            emptyIcon={Heart}
                            emptyTitle="No likes yet"
                            emptyMessage={`${profileUser.name} hasn't liked any content yet.`}
                            renderItems={(likes) =>
                                likes.map((like, index) =>
                                    like.type === "post" ? (
                                        <LikedContentCard
                                            key={`post-${index}`}
                                            type="post"
                                            data={like.data as Post}
                                        />
                                    ) : (
                                        <LikedContentCard
                                            key={`comment-${index}`}
                                            type="comment"
                                            data={like.data as Comment}
                                        />
                                    )
                                )
                            }
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
