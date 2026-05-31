import type React from "react";

export interface writeInterface {
  isOpen: boolean;
  toggle: () => void;

  refreshPosts: boolean;
  triggerRefresh: () => void;
}

export interface UserInterface {
  _id: string;
  name: string;
  email: string;
  password: string;
  bio?: string;
  profileImage?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthInterface {
  isLoggedIn: boolean;
  loading: boolean;
  user: null | UserInterface;
  setUser: React.Dispatch<React.SetStateAction<null | UserInterface>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}
