import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface Invoice {
    id: string;
    date: string;
    total: string;
    status: string;
}

interface InvoiceItemProps {
    invoice: Invoice;
}

export default function InvoiceItem({ invoice }: InvoiceItemProps) {
    return (
        <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
            <div className="flex-1">
                <p className="font-medium">{invoice.date}</p>
                <p className="text-sm text-muted-foreground">{invoice.total}</p>
            </div>
            <a
                href={`/billing/invoices/${invoice.id}`}
                className="flex items-center gap-2"
            >
                <Button variant="ghost" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    Download
                </Button>
            </a>
        </div>
    );
}
