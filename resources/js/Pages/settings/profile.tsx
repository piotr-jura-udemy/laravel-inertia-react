import SettingsLayout from "@/layouts/settings-layout";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { PageProps } from "@/types";
import { ProfileForm } from "@/components/profile-form";

export default function ProfileSettings({ auth }: PageProps) {
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
                    <ProfileForm name={auth.user?.name || ""} />
                </CardContent>
            </Card>
        </SettingsLayout>
    );
}
