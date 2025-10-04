import AppLayout from "@/layouts/app-layout";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useForm, router } from "@inertiajs/react";
import { User, CreditCard } from "lucide-react";
import { PageProps } from "@/types";
import { index as settingsIndex } from "@/actions/App/Http/Controllers/SettingsController";
import { toast } from "sonner";
import { FormEventHandler, useEffect } from "react";

interface SettingsProps extends PageProps {
    section?: string;
}

export default function Settings({ section = "profile", auth }: SettingsProps) {
    const { data, setData, post, processing, errors, recentlySuccessful } =
        useForm({
            name: auth.user?.name || "",
            password: "",
            password_confirmation: "",
        });

    useEffect(() => {
        if (recentlySuccessful) {
            toast.success("Profile updated successfully");
            // Reset password fields after successful update
            setData("password", "");
            setData("password_confirmation", "");
        }
    }, [recentlySuccessful]);

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            const errorMessages = Object.values(errors).join(", ");
            toast.error(`Failed to update profile: ${errorMessages}`);
        }
    }, [errors]);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post("/settings", {
            preserveScroll: true,
        });
    };

    const menuItems = [
        {
            id: "profile",
            label: "Profile Settings",
            icon: User,
            href: "/settings?section=profile",
        },
        {
            id: "billing",
            label: "Billing",
            icon: CreditCard,
            href: "/settings?section=billing",
        },
    ];

    return (
        <AppLayout>
            <div className="flex gap-6">
                {/* Sidebar Navigation */}
                <aside className="w-64 shrink-0">
                    <nav className="space-y-1">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = section === item.id;
                            return (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                        isActive
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    }`}
                                >
                                    <Icon className="h-5 w-5" />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </aside>

                {/* Main Content */}
                <div className="flex-1">
                    {section === "profile" && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Settings</CardTitle>
                                <CardDescription>
                                    Manage your account settings and preferences
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-4"
                                >
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            className={
                                                errors.name
                                                    ? "border-red-500"
                                                    : ""
                                            }
                                        />
                                        {errors.name && (
                                            <p className="text-sm text-red-500">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password">
                                            New Password
                                        </Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            value={data.password}
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Leave blank to keep current password"
                                            className={
                                                errors.password
                                                    ? "border-red-500"
                                                    : ""
                                            }
                                        />
                                        {errors.password && (
                                            <p className="text-sm text-red-500">
                                                {errors.password}
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password_confirmation">
                                            Confirm Password
                                        </Label>
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            value={data.password_confirmation}
                                            onChange={(e) =>
                                                setData(
                                                    "password_confirmation",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Confirm new password"
                                        />
                                    </div>
                                    <Button type="submit" disabled={processing}>
                                        {processing
                                            ? "Saving..."
                                            : "Save Changes"}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    )}

                    {section === "billing" && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Billing & Payments</CardTitle>
                                <CardDescription>
                                    Manage your billing information and boost
                                    posts
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="rounded-lg border p-4">
                                    <h3 className="font-medium mb-2">
                                        Boost Your Posts
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Increase your post visibility by
                                        boosting them to reach more people.
                                    </p>
                                    <Button variant="outline">
                                        Coming Soon
                                    </Button>
                                </div>
                                <div className="rounded-lg border p-4">
                                    <h3 className="font-medium mb-2">
                                        Payment Method
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        No payment method added yet.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
