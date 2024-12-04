export interface ForumPost {
  id: string;
  courseId: string;
  lessonId: string;
  userId: string;
  userDisplayName: string;
  userPhotoURL?: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
  replies: ForumReply[];
}

export interface ForumReply {
  id: string;
  postId: string;
  userId: string;
  userDisplayName: string;
  userPhotoURL?: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}