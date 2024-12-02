import React, { useState } from 'react';
import { Button } from '../ui/Button';

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
        placeholder="Faça uma pergunta ou compartilhe seus pensamentos..."
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 min-h-[100px]"
        disabled={loading}
      />
      <Button type="submit" disabled={!content.trim() || loading}>
        {loading ? 'Publicando...' : 'Publicar'}
      </Button>
    </form>
  );
};