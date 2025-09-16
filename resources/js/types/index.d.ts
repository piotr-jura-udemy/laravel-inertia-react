export interface Post {
    id: number;
    title: string;
    body: string;
    created_at: string;
    updated_at: string;
    user_id: number;
    user?: User;
}

export interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
    posts?: Post[];
    comments?: Comment[];
}

export interface Comment {
    id: number;
    body: string;
    created_at: string;
    updated_at: string;
    post_id: number;
    user_id: number;
    user?: User;
    post?: Post;
}
