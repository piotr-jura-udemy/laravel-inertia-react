import { Link } from "@inertiajs/react";

export default function Home() {
    return (
        <div>
            <h1>Home</h1>
            <div>Welcome to homepage</div>
            <Link href="/about">About</Link>
        </div>
    );
}
