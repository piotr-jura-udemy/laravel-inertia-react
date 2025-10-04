import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface ContentBadgeProps {
    icon: LucideIcon;
    children: ReactNode;
    iconClassName?: string;
}

export default function ContentBadge({
    icon: Icon,
    children,
    iconClassName,
}: ContentBadgeProps) {
    return (
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Icon size={12} className={iconClassName} />
            {children}
        </div>
    );
}
