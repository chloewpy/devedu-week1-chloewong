"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { z } from 'zod';
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  message: z.string().min(5, 'Message must be at least 5 characters'),
});

export default function FeedbackForm() {
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const parsed = formSchema.safeParse(formData);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      setIsSubmitting(false);
      return;
    }

    try {
      // Check if Supabase is properly configured
      if (process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('placeholder')) {
        toast.error('Supabase not configured. Please set up your environment variables.');
        setIsSubmitting(false);
        return;
      }

      const { error } = await supabase.from('comments').insert([parsed.data]);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Comment posted successfully!', {
          description: "Your comment has been saved for Golden.",
        });
        setFormData({ name: '', message: '' }); // Reset form
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg max-w-md mx-auto">
      <h3 className="text-xl font-bold text-orange-900 mb-4">Leave a Comment for Golden</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <input
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-orange-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
            disabled={isSubmitting}
          />
        </div>
        <div>
          <textarea
            name="message"
            placeholder="Your message for Golden..."
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full border border-orange-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
            disabled={isSubmitting}
          />
        </div>
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Posting...' : 'Post Comment'}
        </button>
      </form>
    </div>
  );
}
