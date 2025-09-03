import { BlogComment } from './blogComment';

export interface BlogItem {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  author: string;
  authorAvatar: string;
  comments: number | BlogComment[];
  contentPreview: string;
  headerImageUrl: string;
  likedByMe: boolean;
  likes: number;
}
