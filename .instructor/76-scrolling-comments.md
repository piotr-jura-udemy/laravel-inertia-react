# Optimizing Comments - Infinite Scroll & Smart Polling

## Step 1: The Problem with Current Approach

**Talk about:**

-   Right now we're using `Inertia::defer()` to load all comments at once
-   And we're polling the entire comments array every 3 seconds
-   This works, but it's inefficient - imagine a post with 100+ comments
-   Every 3 seconds we're fetching ALL comments + user relationships

**Show the current code:**

```php
// PostController@show - BEFORE
'comments' => Inertia::defer(
    fn () => $post->comments()
        ->with('user')
        ->latest()
        ->get()  // Get ALL comments
),
```

---

## Step 2: Switch to Infinite Scroll

**Talk about:**

-   Instead of loading all comments at once, let's load them progressively
-   Inertia has `Inertia::scroll()` which enables infinite scrolling
-   We'll use cursor pagination - 2 comments at a time (small number for demo)

**Show the change:**

```php
// PostController@show - AFTER
'comments' => Inertia::scroll(
    fn() => $post->comments()
        ->with('user')
        ->latest()
        ->cursorPaginate(2)  // Load 2 at a time
),
```

**Why cursor pagination?**

-   More efficient than offset pagination for large datasets
-   Doesn't slow down as you paginate deeper

---

## Step 3: Add Comments Count

**Talk about:**

-   Now we need to track how many comments there are total
-   We can't use `comments.length` anymore because we only load 2 at a time
-   Let's add a separate `comments_count` prop as deferred

**Show the addition:**

```php
// PostController@show - NEW PROP
'comments_count' => Inertia::defer(
    fn() => $post->comments()->count()
),
```

---

## Step 4: Update Frontend Types

**Talk about:**

-   When using `Inertia::scroll()`, the data structure changes
-   It's no longer a plain array - it's a paginated object with a `data` property

**Show the change:**

```tsx
// pages/posts/show.tsx
interface PostsShowProps {
    post: Post;
-   comments: Comment[];
+   comments: {
+       data: Comment[];
+   };
    likes: PostLikesData;
+   comments_count: number;  // New prop
}
```

---

## Step 5: Use InfiniteScroll Component

**Talk about:**

-   Replace the `<Deferred>` component with `<InfiniteScroll>`
-   This automatically loads more comments as user scrolls
-   Notice we access `comments.data` now, not just `comments`

**Show the change:**

```tsx
// pages/posts/show.tsx - render section
- <Deferred
-     data="comments"
-     fallback={<CommentList comments={comments} />}
- >
-     <CommentList comments={comments} />
- </Deferred>
+ <InfiniteScroll data="comments">
+     <CommentList comments={comments?.data} />
+ </InfiniteScroll>
```

---

## Step 6: Track Count Instead of Array Length

**Talk about:**

-   We were tracking comment changes using `comments.length`
-   Now we should use the dedicated `comments_count` prop
-   This is important for our notification system

**Show the changes:**

```tsx
// pages/posts/show.tsx
// Initialize the ref
- const commentCountRef = useRef(comments?.length ?? 0);
+ const commentCountRef = useRef(comments_count ?? 0);

// In the useEffect
- const newCommentCount = comments?.length ?? 0;
+ const newCommentCount = comments_count ?? 0;

// Update the dependency
- }, [comments]);
+ }, [comments_count]);
```

---

## Step 7: Optimize Polling (THE BIG WIN)

**Talk about:**

-   This is the key optimization
-   Before: polling ALL comments every 3 seconds (expensive!)
-   After: only poll the count (single database query)
-   We don't need to refetch all comments - just the number

**Show the change:**

```tsx
// pages/posts/show.tsx
usePoll(3_000, {
-   only: ["comments", "likes"],
+   only: ["likes", "comments_count"],
});
```

**Explain the impact:**

-   Before: Fetching 100 comments + 100 user relationships = 201 queries every 3s
-   After: Just COUNT(\*) = 1 query every 3s
-   That's a ~99% reduction in database load!

---

## Step 8: Fix "View Comments" Action

**Talk about:**

-   When user clicks "View Comments" in the toast
-   We need to refetch comments AND reset pagination to page 1
-   Otherwise they might not see the new comments (stuck on page 5)

**Show the change:**

```tsx
// pages/posts/show.tsx - toast action
toast("New comments available", {
    action: {
        label: "View Comments",
-       onClick: scrollToComments,
+       onClick: () => {
+           router.visit(url, {
+               only: ["comments"],
+               reset: ["comments"],  // Reset to page 1
+               preserveScroll: false,
+               onSuccess: () => scrollToComments(),
+           });
+       },
    },
});
```

**Why `reset`?**

-   Resets infinite scroll back to the beginning
-   Ensures user sees new comments from the top

---

## Step 9: Reset Pagination After Adding Comment

**Talk about:**

-   When user adds a new comment, same issue
-   We need to reset pagination so they see their comment at the top
-   Update the comment form success handler

**Show the change:**

```tsx
// components/comment-form.tsx
<Form
    action={store()}
    resetOnSuccess
-   onSuccess={() => onCommentAdded?.()}
-   options={{
-       only: ["comments"],
+   onSuccess={() => {
+       onCommentAdded?.();
+       router.visit(url, {
+           only: ["comments"],
+           reset: ["comments"],  // Reset to page 1
+       });
    }}
>
```

---

## Recap: What We Achieved

**Performance:**

-   99% reduction in polling database queries
-   Comments load progressively (better perceived performance)
-   Scales to hundreds of comments without slowdown

**User Experience:**

-   See content faster (first 2 comments load immediately)
-   Smooth infinite scrolling
-   Notifications still work perfectly

**Key Learnings:**

-   `Inertia::scroll()` vs `Inertia::defer()`
-   Cursor pagination for efficiency
-   Poll counts, not full data
-   Always reset pagination after mutations
