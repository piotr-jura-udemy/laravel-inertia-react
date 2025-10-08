import { Form } from "@inertiajs/react";
import { update } from "@/actions/App/Http/Controllers/ProfileController";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputError } from "@/components/input-error";
import { toast } from "sonner";

interface ProfileFormProps {
    name: string;
}

export function ProfileForm({ name }: ProfileFormProps) {
    return (
        <Form
            action={update()}
            resetOnSuccess={["password", "password_confirmation"]}
            onSuccess={() => toast.success("Profile updated successfully")}
            onError={(errors) => {
                const errorMessages = Object.values(errors).join(", ");
                toast.error(`Failed to update profile: ${errorMessages}`);
            }}
            className="space-y-4"
        >
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
                            defaultValue={name}
                            aria-invalid={!!errors.name}
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="password">New Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Leave blank to keep current password"
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
                            placeholder="Confirm new password"
                            aria-invalid={!!errors.password_confirmation}
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <Button type="submit" disabled={processing}>
                        {processing ? "Saving..." : "Save Changes"}
                    </Button>
                </>
            )}
        </Form>
    );
}
