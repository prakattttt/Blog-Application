export interface commentInterface {
  showComments: boolean;
  postID: string;
}

export interface CommentItem {
  _id: string;

  text: string;

  user: {
    _id: string;
    name: string;
    profileImage: string;
  };
}