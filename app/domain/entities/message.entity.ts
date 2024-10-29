import { User } from "./user.entity";

export interface Message {
  id: number;
  title: string;
  description: string;
  file: string;
  author: User;
  createdAt: string;
  updatedAt: string;
}
