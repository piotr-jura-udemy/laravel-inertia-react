import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Link } from "@inertiajs/react";

export default function Home() {
    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Welcome to Social Platform
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Share your thoughts and connect with others
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Create Posts</CardTitle>
                            <CardDescription>
                                Share your thoughts, ideas, and stories with the
                                community
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button asChild>
                                <Link href="/posts/create">
                                    Create New Post
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Browse Posts</CardTitle>
                            <CardDescription>
                                Discover what others are sharing and join the
                                conversation
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button variant="outline" asChild>
                                <Link href="/posts">View All Posts</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
