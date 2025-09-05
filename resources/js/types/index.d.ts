export interface Post {
    id: number;
    title: string;
    body: string;
    created_at: string;
    updated_at: string;
    user_id: number;
    user: User;
    comments?: Comment[];
    likes?: Like[];
}

export interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
}

export interface Comment {
    id: number;
    post_id: number;
    user_id: number;
    body: string;
    created_at: string;
    updated_at: string;
    user: User;
}

export interface Like {
    id: number;
    post_id: number;
    user_id: number;
    created_at: string;
    updated_at: string;
}
