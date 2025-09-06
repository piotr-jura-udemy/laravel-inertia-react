import AppLayout from "@/layouts/app-layout";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Post } from "@/types";

interface PostsShowProps {
    post: Post;
}

export default function PostsShow({ post }: PostsShowProps) {
    return (
        <AppLayout>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">{post.title}</CardTitle>
                    <CardDescription>By {post.user.name}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="prose prose-sm max-w-none">
                        <p className="whitespace-pre-wrap">{post.body}</p>
                    </div>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
