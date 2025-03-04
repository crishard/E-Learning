import { useState } from 'react';

interface NewPostFormProps {
  onSubmit: (content: string) => Promise<void>;
}

export const NewPostForm: React.FC<NewPostFormProps> = ({ onSubmit }) => {
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Começar uma nova discussão."
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 min-h-[100px]"
        disabled={loading}
      />
      <button
        type="submit"
        disabled={!content.trim() || loading}
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Postando...' : 'Postar mensagem'}
      </button>
    </form>
  );
}