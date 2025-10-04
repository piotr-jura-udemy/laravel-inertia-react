import { Link } from "@inertiajs/react";
import { Users } from "lucide-react";

export default function AppHeaderLogo() {
    return (
        <Link
            href="/"
            className="flex items-center gap-2 text-xl font-semibold text-gray-900 hover:opacity-80 transition-opacity"
        >
            <Users className="h-6 w-6" />
            <span className="hidden sm:inline">Social</span>
        </Link>
    );
}
