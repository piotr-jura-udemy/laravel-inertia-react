import { Card, CardContent } from "./ui/card";
import { Loader2 } from "lucide-react";

interface LoadingCardProps {
    message?: string;
    className?: string;
}

export default function LoadingCard({
    message = "Loading...",
    className,
}: LoadingCardProps) {
    return (
        <Card className={className}>
            <CardContent className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-sm">{message}</p>
            </CardContent>
        </Card>
    );
}
