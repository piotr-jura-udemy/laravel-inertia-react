import { Link, usePage, router } from "@inertiajs/react";
import AppHeaderLink from "./app-header-link";
import AppHeaderLogo from "./app-header-logo";
import { Button } from "./ui/button";
import { create, index } from "@/actions/App/Http/Controllers/PostController";
import {
    destroy as logout,
    create as loginPage,
} from "@/actions/App/Http/Controllers/Auth/LoginController";
import home from "@/routes/home";
import about from "@/routes/about";
import { PageProps } from "@/types";

export default function AppHeader() {
    const { auth } = usePage<PageProps>().props;

    const handleLogout = () => {
        router.post(logout().url);
    };

    return (
        <header>
            <div className="max-w-4xl mx-auto px-4 py-4">
                <nav className="flex items-center justify-between">
                    <AppHeaderLogo />
                    <div className="flex space-x-6 items-center">
                        {auth.user && (
                            <Button>
                                <Link href={create()}>Add Post</Link>
                            </Button>
                        )}
                        <AppHeaderLink href={home.index().url}>
                            Home
                        </AppHeaderLink>
                        <AppHeaderLink href={about.index().url}>
                            About
                        </AppHeaderLink>
                        <AppHeaderLink href={index().url}>Posts</AppHeaderLink>
                        {auth.user ? (
                            <Button variant="outline" onClick={handleLogout}>
                                Sign Out
                            </Button>
                        ) : (
                            <Button asChild>
                                <Link href={loginPage().url}>Sign In</Link>
                            </Button>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}
