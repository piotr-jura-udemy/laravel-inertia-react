export interface Post {
    id: number;
    title: string;
    body: string;
    created_at: string;
    updated_at: string;
    user_id: number;
    user?: User;
    comments?: Comment[];
    likes?: Like[];
    likes_count?: number;
    comments_count?: number;
    is_boosted?: boolean;
    boosted_at?: string | null;
    boosted_until?: string | null;
}

export interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
    posts?: Post[];
    comments?: Comment[];
    followers_count?: number;
    following_count?: number;
    is_following?: boolean;
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
    likes?: Like[];
    likes_count?: number;
    likes_data?: PostLikesData;
}

export interface Like {
    id: number;
    likeable_type: string;
    likeable_id: number;
    user_id: number;
    created_at: string;
    updated_at: string;
}

export interface PostLikesData {
    count: number;
    user_has_liked: boolean;
}

export interface NotificationData {
    id: string;
    type: string;
    actor: {
        id: number;
        name: string;
    };
    data: any;
    read_at: string | null;
    created_at: string;
}

export interface PageProps {
    auth: {
        user: User | null;
    };
    notifications?: {
        data: NotificationData[];
        unread_count: number;
    } | null;
    [key: string]: any;
}
