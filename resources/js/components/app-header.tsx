import AppHeaderLogo from "./app-header-logo";
import AppHeaderActions from "./app-header-actions";

export default function AppHeader() {
    return (
        <header>
            <div className="max-w-4xl mx-auto px-4 py-4">
                <nav className="flex items-center justify-between">
                    <AppHeaderLogo />
                    <AppHeaderActions />
                </nav>
            </div>
        </header>
    );
}
