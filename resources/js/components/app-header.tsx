import { Link } from "@inertiajs/react";
import AppHeaderLink from "./app-header-link";
import AppHeaderLogo from "./app-header-logo";

export default function AppHeader() {
    return (
        <header>
            <div className="max-w-4xl mx-auto px-4 py-4">
                <nav className="flex items-center justify-between">
                    <AppHeaderLogo />
                    <div className="flex space-x-6">
                        <Link href="/posts/create">Add Post</Link>
                        <AppHeaderLink href="/">Home</AppHeaderLink>
                        <AppHeaderLink href="/about">About</AppHeaderLink>
                        <AppHeaderLink href="/posts">Posts</AppHeaderLink>
                    </div>
                </nav>
            </div>
        </header>
    );
}
