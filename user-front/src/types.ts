export interface Post {
  id: string;
  title: string;
  content: string;
  author?: User;
  authorId: string;
  comments?: Comment[];
  isPublished: boolean;
  publishedAt: Date;
  thumbnailUrl: string;
}

export interface Comment {
  id: string;
  content: string;
  postId: string;
  author?: User;
  authorId: string;
  publishedAt: Date;
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  ROLE: string;
  comments: Comment[];
  posts: Post[];
  avatarUrl?: string;
  exp?: number;
  iat?: number;
}
