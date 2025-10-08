import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";

export default function BoostPostsSection() {
    return (
        <div className="rounded-lg border p-4">
            <h3 className="font-medium mb-2">Boost Your Posts</h3>
            <p className="text-sm text-muted-foreground mb-4">
                Increase your post visibility by boosting them for 7 days. Go to
                any of your posts to boost them.
            </p>
            <Link href="/posts">
                <Button variant="outline">View My Posts</Button>
            </Link>
        </div>
    );
}
