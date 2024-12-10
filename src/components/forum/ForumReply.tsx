import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ForumReply as IForumReply } from '../../types/forum';

interface ForumReplyProps {
  reply: IForumReply;
}

export const ForumReply: React.FC<ForumReplyProps> = ({ reply }) => {
  return (
    <div className="pl-8 pt-4">
      <div className="flex items-start gap-3">
        {reply.userPhotoURL ? (
          <img
            src={reply.userPhotoURL}
            alt={reply.userDisplayName}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white text-sm">
            {reply.userDisplayName[0]}
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">{reply.userDisplayName}</span>
            <span className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(reply.createdAt), { locale: ptBR, addSuffix: true })}
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-700">{reply.content}</p>
        </div>
      </div>
    </div>
  );
}