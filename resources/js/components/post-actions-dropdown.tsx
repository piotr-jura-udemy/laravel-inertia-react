import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Link, router } from "@inertiajs/react";
import { destroy, edit } from "@/actions/App/Http/Controllers/PostController";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "./ui/alert-dialog";
import { toast } from "sonner";

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
    const handleDelete = () => {
        router.delete(destroy(postId));
    };

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
                {canDelete && (
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                            >
                                <Trash2 />
                                Delete Post
                            </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Are you sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will
                                    permantly delete your post and remove all
                                    associated comments and likes.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDelete}>
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
