import SettingsLayout from "@/layouts/settings-layout";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageProps } from "@/types";

export default function Billing({ auth }: PageProps) {
    return (
        <SettingsLayout activeSection="billing">
            <Card>
                <CardHeader>
                    <CardTitle>Billing & Payments</CardTitle>
                    <CardDescription>
                        Manage your billing information and boost posts
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="rounded-lg border p-4">
                        <h3 className="font-medium mb-2">Boost Your Posts</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Increase your post visibility by boosting them to
                            reach more people.
                        </p>
                        <Button variant="outline">Coming Soon</Button>
                    </div>
                    <div className="rounded-lg border p-4">
                        <h3 className="font-medium mb-2">Payment Method</h3>
                        <p className="text-sm text-muted-foreground">
                            No payment method added yet.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </SettingsLayout>
    );
}
