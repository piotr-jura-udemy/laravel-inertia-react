import AppLayout from "@/layouts/app-layout";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function About() {
    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                        About Social Platform
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Learn more about our community-driven platform
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Our Mission</CardTitle>
                        <CardDescription>
                            Building connections through shared stories
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="prose prose-sm max-w-none">
                        <p>
                            Social Platform is a modern, community-driven space
                            where people can share their thoughts, ideas, and
                            stories. Built with the latest web technologies
                            including Laravel, React, and Inertia.js, we provide
                            a seamless and engaging user experience.
                        </p>
                        <p>
                            Our platform encourages meaningful conversations and
                            connections between users from all walks of life.
                            Whether you're sharing a personal experience,
                            discussing current events, or simply expressing your
                            creativity, Social Platform provides the tools and
                            community to make your voice heard.
                        </p>
                    </CardContent>
                </Card>

                <div className="grid gap-6 md:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">
                                Easy to Use
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Simple, intuitive interface that makes sharing
                                your thoughts effortless.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">
                                Community Focused
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Built for meaningful connections and engaging
                                conversations.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">
                                Modern Tech
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Powered by Laravel, React, and Inertia.js for a
                                fast, reliable experience.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
