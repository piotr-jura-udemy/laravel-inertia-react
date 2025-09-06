import { Link } from "@inertiajs/react";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface AppHeaderLinkProps {
    href: string;
    children: ReactNode;
}

export default function AppHeaderLink({ href, children }: AppHeaderLinkProps) {
    return (
        <Button variant="ghost" asChild>
            <Link href={href}>{children}</Link>
        </Button>
    );
}
