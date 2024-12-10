import { useState } from 'react';

interface ReplyFormProps {
  onSubmit: (content: string) => Promise<void>;
}

export const ReplyForm: React.FC<ReplyFormProps> = ({ onSubmit }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || loading) return;

    setLoading(true);
    try {
      await onSubmit(content);
      setContent('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Escreva sua resposta"
        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 min-h-[80px] text-sm"
        disabled={loading}
      />
      <button
        type="submit"
        disabled={!content.trim() || loading}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 text-sm"
      >
        {loading ? 'Enviando...' : 'Responder'}
      </button>
    </form>
  );
}