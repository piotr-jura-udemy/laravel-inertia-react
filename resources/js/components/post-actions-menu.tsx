import { Link, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface PostActionsMenuProps {
    postId: number;
    canUpdate: boolean;
    canDelete: boolean;
}

export default function PostActionsMenu({
    postId,
    canUpdate,
    canDelete,
}: PostActionsMenuProps) {
    const handleDelete = () => {
        router.delete(`/posts/${postId}`, {
            onSuccess: () => {
                toast("Post deleted successfully");
            },
        });
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
                        <Link href={`/posts/${postId}/edit`}>
                            <Pencil />
                            Edit Post
                        </Link>
                    </DropdownMenuItem>
                )}
                {canDelete && (
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <DropdownMenuItem
                                variant="destructive"
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
                                    permanently delete your post and remove all
                                    associated comments and likes.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleDelete}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
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
