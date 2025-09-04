import AppLayout from "@/layouts/app-layout";
import { Post } from "@/types";

interface PostsShowProps {
    post: Post;
}

export default function PostsShow({ post }: PostsShowProps) {
    return (
        <AppLayout>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {post.title}
            </h1>
            <p className="text-sm text-gray-500 mb-4">By {post.user.name}</p>
            <div className="text-gray-700">{post.body}</div>
        </AppLayout>
    );
}
