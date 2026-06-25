export interface CardType {
  id: string;

  imageSrc?: string;

  userName: string;

  timeSincePosted: string;

  header: string;

  description: string;

  likes: number;

  comments: number;

  profileImg?: string;

  isBookmarked?: boolean;

  animationDelay?: number;
}
