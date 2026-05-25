export interface PostBody {
    title: string, 
    description: string,
    imageSrc?: string
}

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