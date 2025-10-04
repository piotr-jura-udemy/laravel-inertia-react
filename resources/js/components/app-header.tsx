import { Link, usePage, router } from "@inertiajs/react";
import AppHeaderLink from "./app-header-link";
import AppHeaderLogo from "./app-header-logo";
import { Button } from "./ui/button";
import { create, index } from "@/actions/App/Http/Controllers/PostController";
import {
    destroy as logout,
    create as loginPage,
} from "@/actions/App/Http/Controllers/Auth/LoginController";
import { show as userProfile } from "@/actions/App/Http/Controllers/UserController";
import { PageProps } from "@/types";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut } from "lucide-react";

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
                        <AppHeaderLink href={index().url}>Posts</AppHeaderLink>
                        {auth.user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm font-bold hover:bg-gray-300 transition-colors">
                                        {auth.user.name.charAt(0).toUpperCase()}
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>
                                        {auth.user.name}
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href={userProfile(auth.user.id).url}
                                            className="cursor-pointer"
                                        >
                                            <User className="mr-2 h-4 w-4" />
                                            Profile
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={handleLogout}
                                        className="cursor-pointer"
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
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
