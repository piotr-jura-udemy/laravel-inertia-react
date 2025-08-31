import AppLayout from "@/layouts/app-layout";
import { Link } from "@inertiajs/react";

export default function About() {
    return (
        <AppLayout>
            <h1>About</h1>
            <div>Welcome to about page</div>
            <Link href="/">Home</Link>
        </AppLayout>
    );
}
