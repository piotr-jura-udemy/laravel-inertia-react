import { Card, CardContent } from "@/components/ui/card";

interface EmptyStateProps {
    message: string;
}

export default function EmptyState({ message }: EmptyStateProps) {
    return (
        <Card>
            <CardContent className="py-8 text-center text-sm text-muted-foreground">
                {message}
            </CardContent>
        </Card>
    );
}
