import SettingsLayout from "@/layouts/settings-layout";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { PageProps } from "@/types";
import BoostPostsSection from "@/components/boost-posts-section";
import PaymentMethodSection from "@/components/payment-method-section";
import InvoiceList from "@/components/invoice-list";

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
                        <BoostPostsSection />
                        <PaymentMethodSection
                            hasPaymentMethod={hasPaymentMethod}
                        />
                    </CardContent>
                </Card>

                <InvoiceList invoices={invoices} />
            </div>
        </SettingsLayout>
    );
}
