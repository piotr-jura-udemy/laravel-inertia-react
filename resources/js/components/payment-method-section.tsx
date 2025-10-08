import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";

interface PaymentMethodSectionProps {
    hasPaymentMethod: boolean;
}

export default function PaymentMethodSection({
    hasPaymentMethod,
}: PaymentMethodSectionProps) {
    return (
        <div className="rounded-lg border p-4">
            <h3 className="font-medium mb-2">Payment Method</h3>
            <p className="text-sm text-muted-foreground mb-4">
                {hasPaymentMethod
                    ? "You have a payment method on file."
                    : "No payment method added yet. Add one when you make your first purchase."}
            </p>
            <Link href="/billing/portal" method="get">
                <Button variant="outline">Manage Billing Portal</Button>
            </Link>
        </div>
    );
}
