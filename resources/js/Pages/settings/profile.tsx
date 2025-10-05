import SettingsLayout from "@/layouts/settings-layout";
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
import { useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import { toast } from "sonner";
import { FormEventHandler, useEffect } from "react";

export default function ProfileSettings({ auth }: PageProps) {
    const { data, setData, post, processing, errors, recentlySuccessful } =
        useForm({
            name: auth.user?.name || "",
            password: "",
            password_confirmation: "",
        });

    useEffect(() => {
        if (recentlySuccessful) {
            toast.success("Profile updated successfully");
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
        post(route("profile.update"), {
            preserveScroll: true,
        });
    };

    return (
        <SettingsLayout activeSection="profile">
            <Card>
                <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                    <CardDescription>
                        Manage your account settings and preferences
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className={errors.name ? "border-red-500" : ""}
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500">
                                    {errors.name}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">New Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                placeholder="Leave blank to keep current password"
                                className={
                                    errors.password ? "border-red-500" : ""
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
                            {processing ? "Saving..." : "Save Changes"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </SettingsLayout>
    );
}
