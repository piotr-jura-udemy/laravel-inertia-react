import { Link, usePage } from "@inertiajs/react";
import { Button } from "./ui/button";
import { PageProps } from "@/types";
import { create } from "@/actions/App/Http/Controllers/PostController";
import { create as loginPage } from "@/actions/App/Http/Controllers/Auth/LoginController";
import NotificationsPopover from "./notifications-popover";
import { SearchCommand } from "./search-command";
import UserDropdown from "./user-dropdown";

export default function AppHeaderActions() {
    const { auth } = usePage<PageProps>().props;

    return (
        <div className="flex space-x-6 items-center">
            <SearchCommand />
            {auth.user && (
                <Button asChild>
                    <Link href={create().url}>Add Post</Link>
                </Button>
            )}
            {auth.user && <NotificationsPopover />}
            {auth.user ? (
                <UserDropdown />
            ) : (
                <Button asChild>
                    <Link href={loginPage().url}>Sign In</Link>
                </Button>
            )}
        </div>
    );
}
