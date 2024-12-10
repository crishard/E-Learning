import React from 'react';
import { ForumReply as ForumReplyType } from '../../types/forum';
import { ForumReply } from './ForumReply';

interface RepliesListProps {
  replies: ForumReplyType[];
}

export const RepliesList: React.FC<RepliesListProps> = ({ replies }) => {
  if (!replies || replies.length === 0) return null;

  return (
    <div className="mt-4 space-y-4 border-l-2 border-gray-100">
      {replies.map((reply) => (
        <ForumReply key={reply.id} reply={reply} />
      ))}
    </div>
  );
};