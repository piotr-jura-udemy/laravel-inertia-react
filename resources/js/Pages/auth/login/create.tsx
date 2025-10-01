import { store } from "@/actions/App/Http/Controllers/Auth/LoginController";
import { create } from "@/actions/App/Http/Controllers/Auth/RegisterController";
import { InputError } from "@/components/input-error";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/layouts/auth-layout";
import { Form, Link } from "@inertiajs/react";

export default function Login() {
    return (
        <AuthLayout>
            <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Sign in to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form action={store()} className="space-y-4">
                        {({ errors, processing }) => (
                            <>
                                <div className="space-y-1">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        autoFocus
                                        aria-invalid={!!errors.email}
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="space-y-1">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        aria-invalid={!!errors.password}
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <div className="flex items-center justify-between pt-2">
                                    <Link
                                        href={create()}
                                        className="text-sm text-muted-foreground hover:underline"
                                    >
                                        Need an account?
                                    </Link>
                                    <Button type="submit" disabled={processing}>
                                        {processing ? "Logging in..." : "Login"}
                                    </Button>
                                </div>
                            </>
                        )}
                    </Form>
                </CardContent>
            </Card>
        </AuthLayout>
    );
}
