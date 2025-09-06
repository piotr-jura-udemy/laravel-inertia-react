import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import AppHeaderLink from "./app-header-link";
import AppHeaderLogo from "./app-header-logo";

export default function AppHeader() {
    return (
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="max-w-4xl mx-auto px-4 py-4">
                <nav className="flex items-center justify-between">
                    <AppHeaderLogo />
                    <div className="flex items-center space-x-2">
                        <Button asChild>
                            <Link href="/posts/create">Add Post</Link>
                        </Button>
                        <AppHeaderLink href="/">Home</AppHeaderLink>
                        <AppHeaderLink href="/about">About</AppHeaderLink>
                        <AppHeaderLink href="/posts">Posts</AppHeaderLink>
                    </div>
                </nav>
            </div>
        </header>
    );
}
