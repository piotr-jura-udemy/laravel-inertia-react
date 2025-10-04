import { Link } from "@inertiajs/react";
import { create as loginPage } from "@/actions/App/Http/Controllers/Auth/LoginController";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { LucideIcon } from "lucide-react";

interface SignInPromptProps {
    icon: LucideIcon;
    message: string;
    actionText?: string;
}

export default function SignInPrompt({
    icon: Icon,
    message,
    actionText = "Sign in",
}: SignInPromptProps) {
    return (
        <Card className="rounded-none">
            <CardContent className="pt-6">
                <div className="text-center py-6 space-y-3">
                    <Icon className="mx-auto h-12 w-12 text-gray-300" />
                    <p className="text-gray-600">{message}</p>
                    <Button asChild>
                        <Link href={loginPage().url}>{actionText}</Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
