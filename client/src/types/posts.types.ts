export interface PostCard {
  _id: string;

  title: string;

  description: string;

  imageSrc?: string;

  commentsCount: number;

  likes: string[];

  createdAt: string;

  author: {
    _id: string;
    name: string;
    profileImage?: string;
  };
}

export interface GetPostData {
  success: boolean,
  posts: PostCard[],
  totalPages: number
}

export interface CardsProps {
  posts: PostCard[];
  loading: boolean
}
