import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface Message {
  id: number;
  name: string;
  message: string;
  created_at: string;
}

export function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMessages = async () => {
    try {
      console.log('Loading messages from Supabase...');
      console.log('Supabase client:', supabase);
      
      const { data, error } = await supabase
        .from('Comments')
        .select('*')
        .order('created_at', { ascending: false });
      
      console.log('Messages loaded:', { data, error });
      
      if (error) {
        console.error('Error loading messages:', error);
      } else {
        setMessages(data || []);
      }
    } catch (err) {
      console.error('Unexpected error loading messages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  // Refresh messages every 5 seconds to catch new comments
  useEffect(() => {
    const interval = setInterval(loadMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-orange-700">Recent Messages</h3>
        <button
          onClick={loadMessages}
          disabled={loading}
          className="px-4 py-2 text-sm bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>
      <div className="space-y-4 max-w-4xl">
        {loading ? (
          <p className="text-gray-500 text-center py-8">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No messages yet. Be the first to leave a comment for Golden!</p>
        ) : (
          messages.map((m: Message) => (
            <div key={m.id} className="bg-gray-50 px-6 py-3 rounded-lg border-l-4 border-orange-400 w-full">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-1">
                    <p className="text-sm text-gray-600">
                      <strong className="text-orange-700 text-base">{m.name}</strong>
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(m.created_at).toLocaleDateString()} at {new Date(m.created_at).toLocaleTimeString()}
                    </p>
                  </div>
                  <p className="text-gray-800 text-base">{m.message}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
