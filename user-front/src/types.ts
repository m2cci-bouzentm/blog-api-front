export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  comments?: Comment[];
  isPublished: boolean;
  publishedAt: Date;
  // thumbnailUrl: string;
}

export interface Comment {
  id: string;
  content: string;
  postId: string;
  authorId: string;
  publishedAt: Date;
}
