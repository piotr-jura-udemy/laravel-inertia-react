# Authorization - Protecting Posts & Comments

## Step 1: The Security Problem

**Talk about:**

-   Right now, anyone (even guests) can post comments
-   There's no way to edit or delete posts
-   Even if we added those features, any user could edit anyone's post
-   This is a major security hole - we need authorization!

**Show the current issues:**

```php
// routes/web.php - BEFORE
Route::post('/comments', [CommentController::class, 'store']);
// No auth middleware - guests can post!
```

**Why this matters:**

-   Authorization protects user content
-   It's a fundamental security layer in any app
-   Laravel makes this easy with policies and middleware

---

## Step 2: Protect Comments with Auth Middleware

**Talk about:**

-   Simplest fix first - only authenticated users can comment
-   Laravel's `auth` middleware handles this automatically
-   If not logged in, redirect to login page

**Show the change:**

```php
// routes/web.php - AFTER
Route::post('/comments', [CommentController::class, 'store'])->middleware('auth');
```

**Why middleware?**

-   Runs before the controller - blocks request early
-   Automatic redirect to login page (named route 'login')
-   Clean separation of concerns

---

## Step 3: Create PostPolicy for Ownership Rules

**Talk about:**

-   For posts, we need more granular control
-   Users should only edit/delete their **own** posts
-   Laravel Policies let us define these ownership rules

**Run the command:**

```bash
php artisan make:policy PostPolicy --model=Post
```

**What this creates:**

-   A policy class with methods for each action
-   Default methods return `false` (opt-in security)
-   We only implement what we need

---

## Step 4: Implement Update and Delete Authorization

**Talk about:**

-   Look at the generated `PostPolicy.php`
-   It has methods like `view()`, `update()`, `delete()`, etc.
-   We only need `update()` and `delete()` - the rest stay `false` (unused)
-   Simple rule: user ID must match post's user_id

**Show the implementation:**

```php
// app/Policies/PostPolicy.php
public function update(User $user, Post $post): bool
{
    return $user->id === $post->user_id;
}

public function delete(User $user, Post $post): bool
{
    return $user->id === $post->user_id;
}
```

**Why this approach?**

-   Crystal clear ownership check
-   `$user` is the authenticated user
-   `$post` is the post they're trying to modify
-   Returns `true` only if they own it

---

## Step 5: Add Edit Method to PostController

**Talk about:**

-   Now we need an edit page to update posts
-   First, add the controller method
-   Use `Gate::authorize()` to enforce the policy

**Show the addition:**

```php
// app/Http/Controllers/PostController.php
use Illuminate\Support\Facades\Gate;

public function edit(Post $post): Response
{
    Gate::authorize('update', $post);

    return Inertia::render('posts/edit', [
        'post' => $post,
    ]);
}
```

**Why `Gate::authorize()`?**

-   Checks the `update()` method in our policy
-   Throws 403 Forbidden if it returns `false`
-   Automatic - no manual if statements needed

---

## Step 6: Add Update Method to PostController

**Talk about:**

-   Handle the form submission for updating
-   Same authorization check
-   Validate input just like we did for create

**Show the addition:**

```php
// app/Http/Controllers/PostController.php
public function update(Request $request, Post $post): RedirectResponse
{
    Gate::authorize('update', $post);

    $validated = $request->validate([
        'title' => 'required|string|min:3|max:255',
        'body' => 'required|string|min:10|max:255',
    ]);

    $post->update($validated);

    return redirect()->route('posts.show', $post);
}
```

**Why redirect to show page?**

-   Good UX - user sees their updated post immediately
-   Need to add named route for this to work

---

## Step 7: Add Delete Method to PostController

**Talk about:**

-   Allow users to delete their own posts
-   Same pattern - authorize first, then act

**Show the addition:**

```php
// app/Http/Controllers/PostController.php
public function destroy(Post $post): RedirectResponse
{
    Gate::authorize('delete', $post);

    $post->delete();

    return redirect('/posts');
}
```

**Why redirect to posts list?**

-   The post no longer exists
-   Can't show a deleted post!

---

## Step 8: Add Routes with Auth Middleware

**Talk about:**

-   Need to add routes for edit, update, and delete
-   All need `auth` middleware (guests shouldn't even access these)
-   Also add named route for `posts.show` (needed for redirect)

**Show the changes:**

```php
// routes/web.php
Route::get('/posts/{post}', [PostController::class, 'show'])->name('posts.show');
Route::get('/posts/{post}/edit', [PostController::class, 'edit'])->middleware('auth');
Route::put('/posts/{post}', [PostController::class, 'update'])->middleware('auth');
Route::delete('/posts/{post}', [PostController::class, 'destroy'])->middleware('auth');
```

**Why both middleware AND Gate::authorize()?**

-   Middleware: blocks guests completely (redirect to login)
-   Gate: blocks authenticated users who don't own the post (403)
-   Two layers of security!

---

## Step 9: Update PostController Show Method

**Talk about:**

-   Frontend needs to know if current user can edit/delete
-   Can't just check on frontend - need server to tell us
-   Pass authorization flags as props

**Show the changes:**

```php
// app/Http/Controllers/PostController.php
public function show(Post $post): Response
{
    $post->load('user');

    return Inertia::render('posts/show', [
        'post' => $post,
        'can_update' => Auth::check() && Gate::allows('update', $post),
        'can_delete' => Auth::check() && Gate::allows('delete', $post),
        // ... rest of props
    ]);
}
```

**Why `Gate::allows()` instead of `authorize()`?**

-   `allows()` returns boolean (true/false)
-   `authorize()` throws exception
-   We want to show the page even if user can't edit

---

## Step 10: Install shadcn/ui Components for the UI

**Talk about:**

-   We need a dropdown menu for edit/delete actions
-   Also need an alert dialog for delete confirmation
-   shadcn/ui provides these components

**Run the commands:**

```bash
npx shadcn@latest add dropdown-menu
npx shadcn@latest add alert-dialog
```

**What we get:**

-   Pre-styled, accessible components
-   Dropdown menu with trigger and items
-   Alert dialog with cancel/confirm actions

---

## Step 11: Add Edit/Delete Menu to Show Page

**Talk about:**

-   Show a three-dot menu in the card header (MoreVertical icon)
-   Only visible if user has permission (from our props)
-   Dropdown menu with Edit and Delete options

**Show the UI result first (describe what user sees):**

-   Three vertical dots appear in top right of post card (only for post owner)
-   Click it to see "Edit Post" and "Delete Post" options
-   Edit has pencil icon, Delete has trash icon
-   Delete option is in red/destructive style

**Show the imports:**

```tsx
// resources/js/pages/posts/show.tsx
import { Link, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
```

**Update the interface:**

```tsx
interface PostsShowProps {
    // ... existing props
    can_update: boolean;
    can_delete: boolean;
}
```

---

## Step 12: Add Delete Handler

**Talk about:**

-   Create a handler function for deleting posts
-   Uses Inertia's `router.delete()` method
-   Shows success toast after deletion

**Show the handler:**

```tsx
// Inside the component
const handleDelete = () => {
    router.delete(`/posts/${post.id}`, {
        onSuccess: () => {
            toast("Post deleted successfully");
        },
    });
};
```

**Why use router.delete()?**

-   Inertia handles DELETE request for us
-   `onSuccess` callback runs after successful deletion
-   Automatic redirect handled by the controller

---

## Step 13: Update Card Header with Dropdown Menu

**Talk about:**

-   Restructure the header to have title on left, menu on right
-   Use flexbox for layout
-   Show dropdown only if user has permission

**Show the change:**

```tsx
// resources/js/pages/posts/show.tsx - CardHeader
<CardHeader>
    <div className="flex items-start justify-between">
        <div className="space-y-1.5">
            <CardTitle className="text-2xl">{post.title}</CardTitle>
            <CardDescription>
                By {post.user?.name} on{" "}
                {new Date(post.created_at).toLocaleDateString()}
            </CardDescription>
        </div>
        {(can_update || can_delete) && (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {can_update && (
                        <DropdownMenuItem asChild>
                            <Link href={`/posts/${post.id}/edit`}>
                                <Pencil />
                                Edit Post
                            </Link>
                        </DropdownMenuItem>
                    )}
                    {can_delete && (
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <DropdownMenuItem
                                    variant="destructive"
                                    onSelect={(e) => e.preventDefault()}
                                >
                                    <Trash2 />
                                    Delete Post
                                </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Are you sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will
                                        permanently delete your post and remove
                                        all associated comments and likes.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={handleDelete}
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        )}
    </div>
</CardHeader>
```

**Why this pattern?**

-   `DropdownMenu` keeps actions organized and hidden until needed
-   `variant="ghost"` makes the trigger button subtle
-   `align="end"` aligns dropdown to the right
-   `asChild` lets us use Link component inside DropdownMenuItem
-   `onSelect={(e) => e.preventDefault()` prevents dropdown from closing when opening the alert dialog

---

## Step 14: Understanding the Alert Dialog Pattern

**Talk about:**

-   AlertDialog is triggered from within the dropdown menu
-   `AlertDialogTrigger asChild` wraps our DropdownMenuItem
-   This creates nested interactive components
-   Need `e.preventDefault()` to stop dropdown from auto-closing

**Why this matters:**

-   Better UX than browser's `confirm()` dialog
-   Fully styled and accessible
-   Can customize the message and buttons
-   Stays consistent with app design

---

## Step 15: Create Edit Page Component

**Talk about:**

-   Very similar to create page
-   Key difference: we need to populate with existing data
-   Use `defaultValue` to pre-fill the form

**Show the UI result first:**

-   Page shows "Edit Post" card with pre-filled form
-   Title and body already contain the post's current data
-   "Update" button instead of "Create"

**Show the new file:**

```tsx
// resources/js/pages/posts/edit.tsx
import { update } from "@/actions/App/Http/Controllers/PostController";
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
import { Textarea } from "@/components/ui/textarea";
import AppLayout from "@/layouts/app-layout";
import { Post } from "@/types";
import { Form } from "@inertiajs/react";

interface PostsEditProps {
    post: Post;
}

export default function PostsEdit({ post }: PostsEditProps) {
    return (
        <AppLayout>
            <Card>
                <CardHeader>
                    <CardTitle>Edit Post</CardTitle>
                    <CardDescription>Update your post</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form action={update(post.id)} className="space-y-4">
                        {({ errors }) => (
                            <>
                                <div className="space-y-1">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        name="title"
                                        type="text"
                                        defaultValue={post.title}
                                        aria-invalid={!!errors.title}
                                    />
                                    <InputError message={errors.title} />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="body">Body</Label>
                                    <Textarea
                                        id="body"
                                        name="body"
                                        defaultValue={post.body}
                                        aria-invalid={!!errors.body}
                                    />
                                    <InputError message={errors.body} />
                                </div>
                                <Button>Update</Button>
                            </>
                        )}
                    </Form>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
```

**Key point: `defaultValue` not `value`:**

-   Uncontrolled form inputs
-   React best practice for forms
-   Lets browser handle the state

---

## Recap: What We Achieved

**Security:**

-   Comments require authentication
-   Posts can only be edited/deleted by their owner
-   Two-layer protection: middleware + policies

**User Experience:**

-   Clean dropdown menu for post actions
-   Professional alert dialog for delete confirmation
-   Icons and clear labels for actions
-   Redirect to appropriate pages after actions

**Key Laravel Concepts:**

-   **Middleware** - route-level protection (`auth`)
-   **Policies** - model-level authorization rules
-   **Gates** - checking permissions in code
-   `authorize()` vs `allows()` - exceptions vs booleans

**UI Components:**

-   **DropdownMenu** - organized actions menu
-   **AlertDialog** - confirmation dialogs
-   **Nested components** - dialog within dropdown

**Architecture Pattern:**

-   Server tells frontend what user can do (via props)
-   Frontend conditionally shows UI based on permissions
-   Never trust frontend - always validate on server
