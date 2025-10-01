import { store } from "@/actions/App/Http/Controllers/Auth/RegisterController";
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

export default function Register() {
    return (
        <AuthLayout>
            <Card>
                <CardHeader>
                    <CardTitle>Register</CardTitle>
                    <CardDescription>
                        Create a new account to get started
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form action={store()} className="space-y-4">
                        {({ errors, processing }) => (
                            <>
                                <div className="space-y-1">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        autoFocus
                                        aria-invalid={!!errors.name}
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                <div className="space-y-1">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
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

                                <div className="space-y-1">
                                    <Label htmlFor="password_confirmation">
                                        Confirm Password
                                    </Label>
                                    <Input
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        type="password"
                                        required
                                        aria-invalid={
                                            !!errors.password_confirmation
                                        }
                                    />
                                    <InputError
                                        message={errors.password_confirmation}
                                    />
                                </div>

                                <div className="flex items-center justify-between pt-2">
                                    <Link
                                        href="/login"
                                        className="text-sm text-muted-foreground hover:underline"
                                    >
                                        Already registered?
                                    </Link>
                                    <Button type="submit" disabled={processing}>
                                        {processing
                                            ? "Registering..."
                                            : "Register"}
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
