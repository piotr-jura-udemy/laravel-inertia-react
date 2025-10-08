import { Link, usePage, router } from "@inertiajs/react";
import { PageProps } from "@/types";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    User,
    LogOut,
    Settings as SettingsIcon,
    ChevronDown,
} from "lucide-react";
import { destroy as logout } from "@/actions/App/Http/Controllers/Auth/LoginController";
import { show as userProfile } from "@/actions/App/Http/Controllers/UserController";
import { show as profileSettings } from "@/actions/App/Http/Controllers/ProfileController";

export default function UserDropdown() {
    const { auth } = usePage<PageProps>().props;

    const handleLogout = () => {
        router.post(logout().url);
    };

    if (!auth.user) return null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-100 transition-colors">
                    <div className="w-8 h-8 rounded-md bg-gray-200 flex items-center justify-center text-gray-600 text-sm font-bold shrink-0">
                        {auth.user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col items-start">
                        <p className="text-sm font-medium leading-none">
                            {auth.user.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {auth.user.email}
                        </p>
                    </div>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                    <Link
                        href={userProfile(auth.user.id).url}
                        className="cursor-pointer"
                    >
                        <User />
                        Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link
                        href={profileSettings().url}
                        className="cursor-pointer"
                    >
                        <SettingsIcon />
                        Settings
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer"
                >
                    <LogOut />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
