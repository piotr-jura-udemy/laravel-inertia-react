export interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
}

export interface Post {
    id: number;
    title: string;
    body: string;
    user_id: number;
    user: User;
    created_at: string;
    updated_at: string;
}
