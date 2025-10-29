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
      
      // First, let's test the connection
      const { data: testData, error: testError } = await supabase
        .from('Comments')
        .select('count')
        .limit(1);
      
      console.log('Connection test:', { testData, testError });
      
      if (testError) {
        console.error('Connection test failed:', testError);
        // If the table doesn't exist, show a helpful message
        if (testError.code === 'PGRST116' || testError.message?.includes('relation') || testError.message?.includes('does not exist')) {
          console.log('Comments table may not exist. This is normal for a new project.');
          setMessages([]);
          return;
        }
      }
      
      const { data, error } = await supabase
        .from('Comments')
        .select('*')
        .order('created_at', { ascending: false });
      
      console.log('Messages loaded:', { data, error });
      
      if (error) {
        console.error('Supabase error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        console.error('Full error object:', error);
        
        // If it's a table not found error, just show empty state
        if (error.code === 'PGRST116' || error.message?.includes('relation') || error.message?.includes('does not exist')) {
          console.log('Comments table does not exist yet. This is normal for a new project.');
          setMessages([]);
        }
      } else {
        console.log('Successfully loaded messages:', data?.length || 0, 'messages');
        setMessages(data || []);
      }
    } catch (err) {
      console.error('Unexpected error loading messages:', err);
      console.error('Error type:', typeof err);
      console.error('Error constructor:', err?.constructor?.name);
      // Set empty messages on any error to prevent UI issues
      setMessages([]);
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
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-orange-700">Recent Messages</h3>
        <button
          onClick={loadMessages}
          disabled={loading}
          className="px-3 py-1.5 text-xs bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>
      <div className="h-80 overflow-y-auto border border-orange-200 rounded-lg bg-white/50 backdrop-blur-sm">
        <div className="p-3 space-y-2">
          {loading ? (
            <p className="text-gray-500 text-center py-8">Loading messages...</p>
          ) : messages.length === 0 ? (
            <div className="text-gray-500 text-center py-8">
              <p>No messages yet. Be the first to leave a comment for Golden!</p>
              <p className="text-xs mt-2 text-gray-400">Comments will appear here once someone posts a message.</p>
            </div>
          ) : (
            messages.map((m: Message) => (
              <div key={m.id} className="bg-gray-50 px-3 py-2 rounded-lg border-l-4 border-orange-400">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="text-xs text-gray-600">
                        <strong className="text-orange-700 text-xs">{m.name}</strong>
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(m.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-gray-800 text-xs leading-relaxed">{m.message}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
