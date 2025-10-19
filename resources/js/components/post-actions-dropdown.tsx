import { MoreVertical, Pencil } from "lucide-react";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Link } from "@inertiajs/react";
import { edit } from "@/actions/App/Http/Controllers/PostController";

interface PostActionsDropdownProps {
    postId: number;
    canUpdate: boolean;
    canDelete: boolean;
}

export default function PostActionsDropdown({
    postId,
    canDelete,
    canUpdate,
}: PostActionsDropdownProps) {
    if (!canUpdate && !canDelete) {
        return null;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {canUpdate && (
                    <DropdownMenuItem asChild>
                        <Link href={edit(postId)}>
                            <Pencil />
                            Edit Post
                        </Link>
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
