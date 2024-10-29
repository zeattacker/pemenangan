import { User } from "./user.entity";

export interface Broadcast {
  id: number | string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  author: User;
}
