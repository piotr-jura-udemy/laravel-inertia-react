import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { User as UserIcon, FileText, Search } from "lucide-react";

// Simple debounce hook
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

interface SearchUser {
    id: number;
    name: string;
    email?: string;
    created_at?: string;
}

interface Post {
    id: number;
    title: string;
    body: string;
    user: {
        id: number;
        name: string;
    };
}

interface SearchResults {
    users: SearchUser[];
    posts: Post[];
}

export function SearchCommand() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState<SearchUser[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    const debouncedQuery = useDebounce(query, 300);

    // Keyboard shortcut
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            setOpen(true);
        }
    };

    // Effect to perform search when debounced query changes
    useEffect(() => {
        if (debouncedQuery.length < 2) {
            setUsers([]);
            setPosts([]);
            setLoading(false);
            return;
        }

        setLoading(true);

        const url = `/api/search?q=${encodeURIComponent(debouncedQuery)}`;

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setUsers(data.users || []);
                setPosts(data.posts || []);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Search error:", error);
                setLoading(false);
            });
    }, [debouncedQuery]);

    const handleSelect = (url: string) => {
        setOpen(false);
        setQuery("");
        setUsers([]);
        setPosts([]);
        router.visit(url);
    };

    const hasResults = users.length > 0 || posts.length > 0;
    const showEmptyState =
        !loading && debouncedQuery.length >= 2 && !hasResults;
    const showLoadingState =
        loading && !hasResults && debouncedQuery.length >= 2;

    return (
        <>
            {/* Trigger button */}
            <button
                onClick={() => setOpen(true)}
                onKeyDown={handleKeyDown}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 border rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors"
            >
                <Search className="h-4 w-4" />
                <span className="hidden sm:inline">Search</span>
                <kbd className="hidden sm:inline pointer-events-none ml-1 select-none items-center gap-1 rounded border bg-gray-50 px-1.5 font-mono text-[10px] font-medium text-gray-600">
                    ⌘K
                </kbd>
            </button>

            <CommandDialog
                open={open}
                onOpenChange={setOpen}
                shouldFilter={false}
            >
                <CommandInput
                    placeholder="Search users and posts..."
                    value={query}
                    onValueChange={setQuery}
                />
                <CommandList>
                    {showLoadingState && (
                        <div className="py-6 text-center text-sm text-gray-500">
                            Searching...
                        </div>
                    )}

                    {showEmptyState && (
                        <CommandEmpty>No results found.</CommandEmpty>
                    )}

                    {users.length > 0 && (
                        <CommandGroup heading="Users">
                            {users.map((user) => (
                                <CommandItem
                                    key={`user-${user.id}`}
                                    onSelect={() =>
                                        handleSelect(`/users/${user.id}`)
                                    }
                                    className="cursor-pointer"
                                >
                                    <UserIcon className="mr-2 h-4 w-4" />
                                    <span>{user.name}</span>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    )}

                    {posts.length > 0 && (
                        <CommandGroup heading="Posts">
                            {posts.map((post) => (
                                <CommandItem
                                    key={`post-${post.id}`}
                                    onSelect={() =>
                                        handleSelect(`/posts/${post.id}`)
                                    }
                                    className="cursor-pointer"
                                >
                                    <FileText className="mr-2 h-4 w-4 flex-shrink-0" />
                                    <div className="flex flex-col">
                                        <span className="font-medium">
                                            {post.title}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            by {post.user.name}
                                        </span>
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    )}
                </CommandList>
            </CommandDialog>
        </>
    );
}
