import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyTitle,
} from "@/components/ui/empty";
import InvoiceItem from "@/components/invoice-item";

interface Invoice {
    id: string;
    date: string;
    total: string;
    status: string;
}

interface InvoiceListProps {
    invoices: Invoice[];
}

export default function InvoiceList({ invoices }: InvoiceListProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Invoice History</CardTitle>
                <CardDescription>Download your past invoices</CardDescription>
            </CardHeader>
            <CardContent>
                {invoices.length === 0 ? (
                    <Empty>
                        <EmptyHeader>
                            <EmptyTitle>No invoices yet</EmptyTitle>
                            <EmptyDescription>
                                Invoices will appear here after you boost a post
                            </EmptyDescription>
                        </EmptyHeader>
                    </Empty>
                ) : (
                    <div className="space-y-2">
                        {invoices.map((invoice) => (
                            <InvoiceItem key={invoice.id} invoice={invoice} />
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
