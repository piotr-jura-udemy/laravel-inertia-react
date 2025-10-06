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
import { Download } from "lucide-react";

interface Invoice {
    id: string;
    date: string;
    total: string;
    status: string;
}

interface BillingPageProps extends PageProps {
    hasPaymentMethod: boolean;
    invoices: Invoice[];
}

export default function Billing({
    auth,
    hasPaymentMethod,
    invoices,
}: BillingPageProps) {
    return (
        <SettingsLayout activeSection="billing">
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Billing & Payments</CardTitle>
                        <CardDescription>
                            Manage your billing information and boost posts
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="rounded-lg border p-4">
                            <h3 className="font-medium mb-2">
                                Boost Your Posts
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Increase your post visibility by boosting them
                                for 7 days. Go to any of your posts to boost
                                them.
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
                            <Link href="/billing/portal" method="get">
                                <Button variant="outline">
                                    Manage Billing Portal
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Invoice History</CardTitle>
                        <CardDescription>
                            Download your past invoices
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {invoices.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground">
                                <p>No invoices yet</p>
                                <p className="text-sm mt-2">
                                    Invoices will appear here after you boost a
                                    post
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {invoices.map((invoice) => (
                                    <div
                                        key={invoice.id}
                                        className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                                    >
                                        <div className="flex-1">
                                            <p className="font-medium">
                                                {invoice.date}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {invoice.total}
                                            </p>
                                        </div>
                                        <a
                                            href={`/billing/invoices/${invoice.id}`}
                                            className="flex items-center gap-2"
                                        >
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="gap-2"
                                            >
                                                <Download className="h-4 w-4" />
                                                Download
                                            </Button>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </SettingsLayout>
    );
}
