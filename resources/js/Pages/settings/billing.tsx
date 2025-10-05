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
import { Link } from "@inertiajs/react";

interface BillingPageProps extends PageProps {
    hasPaymentMethod: boolean;
}

export default function Billing({ auth, hasPaymentMethod }: BillingPageProps) {
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
                            Increase your post visibility by boosting them for 7
                            days. Go to any of your posts to boost them.
                        </p>
                        <Link href="/posts">
                            <Button variant="outline">View My Posts</Button>
                        </Link>
                    </div>
                    <div className="rounded-lg border p-4">
                        <h3 className="font-medium mb-2">Payment Method</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            {hasPaymentMethod
                                ? "You have a payment method on file."
                                : "No payment method added yet. Add one when you make your first purchase."}
                        </p>
                        {hasPaymentMethod && (
                            <Link href="/billing/portal" method="get">
                                <Button variant="outline">
                                    Manage Billing
                                </Button>
                            </Link>
                        )}
                    </div>
                </CardContent>
            </Card>
        </SettingsLayout>
    );
}
