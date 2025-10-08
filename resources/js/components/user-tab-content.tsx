import { WhenVisible } from "@inertiajs/react";
import { Loader2, LucideIcon } from "lucide-react";
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { ReactNode } from "react";

interface UserTabContentProps<T> {
    dataKey: string;
    data: T[] | undefined;
    emptyIcon: LucideIcon;
    emptyTitle: string;
    emptyMessage: string;
    renderItems: (items: T[]) => ReactNode;
}

export default function UserTabContent<T>({
    dataKey,
    data,
    emptyIcon: EmptyIcon,
    emptyTitle,
    emptyMessage,
    renderItems,
}: UserTabContentProps<T>) {
    const loadingState = (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <Loader2 className="animate-spin" />
                </EmptyMedia>
                <EmptyTitle>Loading...</EmptyTitle>
            </EmptyHeader>
        </Empty>
    );

    return (
        <WhenVisible data={dataKey} fallback={loadingState}>
            {!data ? (
                loadingState
            ) : data.length === 0 ? (
                <Empty>
                    <EmptyHeader>
                        <EmptyMedia variant="icon">
                            <EmptyIcon />
                        </EmptyMedia>
                        <EmptyTitle>{emptyTitle}</EmptyTitle>
                        <EmptyDescription>{emptyMessage}</EmptyDescription>
                    </EmptyHeader>
                </Empty>
            ) : (
                <div className="space-y-4">{renderItems(data)}</div>
            )}
        </WhenVisible>
    );
}
