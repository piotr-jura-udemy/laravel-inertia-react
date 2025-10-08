import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "@/types";
import { Calendar } from "lucide-react";

interface UserProfileHeaderProps {
    user: User;
    isOwnProfile: boolean;
    onFollow?: () => void;
}

export default function UserProfileHeader({
    user,
    isOwnProfile,
    onFollow,
}: UserProfileHeaderProps) {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xl font-bold shrink-0">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                        <CardTitle className="text-xl">{user.name}</CardTitle>
                        <CardDescription className="flex items-center gap-2 text-xs">
                            <Calendar size={12} />
                            Joined{" "}
                            {new Date(user.created_at).toLocaleDateString(
                                "en-US",
                                {
                                    month: "short",
                                    year: "numeric",
                                }
                            )}
                            <span className="ml-2">
                                {user.followers_count ?? 0} followers ·{" "}
                                {user.following_count ?? 0} following
                            </span>
                        </CardDescription>
                    </div>
                    {!isOwnProfile && onFollow && (
                        <Button
                            onClick={onFollow}
                            variant={user.is_following ? "outline" : "default"}
                        >
                            {user.is_following ? "Unfollow" : "Follow"}
                        </Button>
                    )}
                </div>
            </CardHeader>
        </Card>
    );
}
