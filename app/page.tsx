"use client";

import { useState } from "react";
import { toast } from "sonner";
import { supabase } from '@/lib/supabaseClient';
import { MessageList } from '@/components/MessageList';
import Link from 'next/link';
import { z } from 'zod';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  message: z.string().min(5, 'Message must be at least 5 characters'),
});

export default function Home() {
  const [formData, setFormData] = useState({
    slide1: { name: '', message: '' },
    slide2: { name: '', message: '' },
    slide3: { name: '', message: '' }
  });
  const [isSubmitting, setIsSubmitting] = useState({
    slide1: false,
    slide2: false,
    slide3: false
  });
  const [posted, setPosted] = useState({
    slide1: false,
    slide2: false,
    slide3: false
  });

  const handleFormChange = (slide: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [slide]: { ...prev[slide as keyof typeof prev], [field]: value }
    }));
  };

  const handleSubmit = async (slide: string) => {
    const currentFormData = formData[slide as keyof typeof formData];
    setIsSubmitting(prev => ({ ...prev, [slide]: true }));

    const parsed = formSchema.safeParse(currentFormData);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      setIsSubmitting(prev => ({ ...prev, [slide]: false }));
      return;
    }

    try {
      console.log('Submitting comment:', parsed.data);
      console.log('Supabase client:', supabase);
      
      const { data, error } = await supabase.from('Comments').insert([parsed.data]).select();
      
      console.log('Supabase response:', { data, error });
      
      if (error) {
        console.log('Supabase error:', error);
        const errorMessage = error?.message || 'Database error occurred';
        toast.error(`Database error: ${errorMessage}`);
      } else {
        console.log('Comment saved successfully:', data);
        toast.success('Comment posted successfully!', {
          description: "Your comment has been saved for Golden.",
        });
        setFormData(prev => ({
          ...prev,
          [slide]: { name: '', message: '' }
        }));
        setPosted(prev => ({ ...prev, [slide]: true }));
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(prev => ({ ...prev, [slide]: false }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100">
      {/* Header */}
      <div className="absolute top-4 left-4 z-10">
        <h1 className="text-4xl font-bold text-orange-900">Golden's 
          Profile</h1>
      </div>
      
      {/* Username Hover Card */}
      <div className="absolute bottom-4 right-4 z-10">
        <HoverCard>
          <HoverCardTrigger asChild>
            <button className="text-sm text-gray-600 hover:text-gray-800 transition-colors cursor-pointer hover:underline">
              @goldenthecat
            </button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">@goldenthecat</h4>
                <p className="text-sm text-gray-600">
                  Golden is a New Zealand based cat.
                </p>
                <div className="flex items-center pt-2">
                  <span className="text-xs text-gray-500">Spawned in 2018</span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
      
      {/* Chat with Golden Button */}
      <div className="absolute top-4 right-4 z-10">
        <Link href="/ai">
          <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold transition-all duration-200 shadow-xl hover:shadow-2xl hover:scale-105">
            Chat with Golden 🐱
          </button>
        </Link>
      </div>

      {/* Main Content - Full Height */}
      <div className="h-[calc(100vh-8rem)] flex items-center justify-center p-4 gap-8 mt-8 max-w-7xl mx-auto">
        {/* Left Half - Photo Carousel */}
        <div className="flex-1 max-w-2xl">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20">
            <Carousel
              className="w-full"
              opts={{
                align: "center",
                loop: true,
              }}
            >
            <CarouselContent>
              <CarouselItem>
                <Card className="w-full h-full mx-auto">
      <CardHeader>
                  <CardTitle>Felt cute might delete later</CardTitle>
      </CardHeader>
      <CardContent className="h-full">
                  <div className="flex gap-6 h-full">
                    <div className="flex-shrink-0">
                      <Image
                        src="/cute.jpg"
                        alt="Cute Cat"
                        width={300}
                        height={320}
                        className="object-cover rounded-lg"
                        style={{ aspectRatio: '15/16' }}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-600 mb-4">
                        Leave a comment for Golden.
                      </p>
                  {!posted.slide1 ? (
                    <div className="space-y-3">
                      <input
                        name="name"
                        placeholder="Your name"
                        value={formData.slide1.name}
                        onChange={(e) => handleFormChange("slide1", "name", e.target.value)}
                        className="w-full p-2 border rounded-md"
                        style={{ borderColor: '#d1d5db' }}
                        disabled={isSubmitting.slide1}
                      />
                      <textarea
                        name="message"
                        placeholder="Your message for Golden..."
                        value={formData.slide1.message}
                        onChange={(e) => handleFormChange("slide1", "message", e.target.value)}
                        className="w-full p-2 border rounded-md resize-none"
                        style={{ borderColor: '#d1d5db' }}
                        rows={3}
                        disabled={isSubmitting.slide1}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSubmit("slide1")}
                          disabled={isSubmitting.slide1}
                          className="flex-1 px-4 py-2 text-white rounded transition-colors disabled:opacity-50"
                          style={{ backgroundColor: '#ff5900' }}
                        >
                            {isSubmitting.slide1 ? 'Posting...' : 'Comment'}
                        </button>
                        <button
                          onClick={() =>
                            toast("You have liked this post", {
                              description: "Like has been sent to Golden",
                              action: {
                                label: "Undo",
                                onClick: () => console.log("Undo"),
                              },
                            })
                          }
                          className="px-4 py-2 text-white rounded transition-colors"
                          style={{ backgroundColor: '#ff5900' }}
                        >
                          Like
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-4">
                      <div className="bg-gray-100 p-4 rounded-md border-l-4 border-blue-500">
                        <p className="text-sm text-gray-600 mb-1">Your Comment:</p>
                        <p className="text-gray-800">{formData.slide1.message}</p>
                      </div>
                      <button
                        onClick={() =>
                          toast("You have liked this post", {
                            description: "Like has been sent to Golden",
                            action: {
                              label: "Undo",
                              onClick: () => console.log("Undo"),
                            },
                          })
                        }
                        className="w-full px-4 py-2 text-white rounded transition-colors mt-2"
                        style={{ backgroundColor: '#ff5900' }}
                      >
                        Like Post
                      </button>
                    </div>
                  )}
                    </div>
                  </div>
      </CardContent>
      <CardFooter>
                  <p className="text-sm text-gray-500">Posted Today</p>
      </CardFooter>
    </Card>
              </CarouselItem>
              <CarouselItem>
                <Card className="w-full h-full mx-auto">
                  <CardHeader>
                    <CardTitle>Unemployment-maxxing</CardTitle>
                  </CardHeader>
                  <CardContent className="h-full">
                    <div className="flex gap-6 h-full">
                      <div className="flex-shrink-0">
                        <Image
                          src="/lazy.jpg"
                          alt="Lazy Cat"
                          width={300}
                          height={320}
                          className="object-cover rounded-lg"
                          style={{ aspectRatio: '15/16' }}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-600 mb-4">
                          Leave a comment for Golden.
                        </p>
                    {!posted.slide2 ? (
                      <div className="space-y-3">
                        <input
                          name="name"
                          placeholder="Your name"
                          value={formData.slide2.name}
                          onChange={(e) => handleFormChange("slide2", "name", e.target.value)}
                          className="w-full p-2 border rounded-md"
                          style={{ borderColor: '#d1d5db' }}
                          disabled={isSubmitting.slide2}
                        />
                        <textarea
                          name="message"
                          placeholder="Your message for Golden..."
                          value={formData.slide2.message}
                          onChange={(e) => handleFormChange("slide2", "message", e.target.value)}
                          className="w-full p-2 border rounded-md resize-none"
                          style={{ borderColor: '#d1d5db' }}
                          rows={3}
                          disabled={isSubmitting.slide2}
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSubmit("slide2")}
                            disabled={isSubmitting.slide2}
                            className="flex-1 px-4 py-2 text-white rounded transition-colors disabled:opacity-50"
                            style={{ backgroundColor: '#ff5900' }}
                          >
                            {isSubmitting.slide2 ? 'Posting...' : 'Comment'}
                          </button>
                          <button
                            onClick={() =>
                              toast("You have liked this post", {
                                description: "Like has been sent to Golden",
                                action: {
                                  label: "Undo",
                                  onClick: () => console.log("Undo"),
                                },
                              })
                            }
                            className="px-4 py-2 text-white rounded transition-colors"
                            style={{ backgroundColor: '#ff5900' }}
                          >
                            Like Post
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="mb-4">
                        <div className="bg-gray-100 p-4 rounded-md border-l-4 border-green-500">
                          <p className="text-sm text-gray-600 mb-1">Your Comment:</p>
                          <p className="text-gray-800">{formData.slide2.message}</p>
                        </div>
                        <button
                          onClick={() =>
                          toast("You have liked this post", {
                            description: "Like has been sent to Golden",
                            action: {
                              label: "Undo",
                              onClick: () => console.log("Undo"),
                            },
                          })
                          }
                          className="w-full px-4 py-2 text-white rounded transition-colors mt-2"
                          style={{ backgroundColor: '#ff5900' }}
                        >
                          Like 
                        </button>
                      </div>
                    )}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <p className="text-sm text-gray-500">Posted Today</p>
                  </CardFooter>
                </Card>
              </CarouselItem>
              <CarouselItem>
                <Card className="w-full h-full mx-auto">
                  <CardHeader>
                    <CardTitle>Merry Christmas</CardTitle>
                  </CardHeader>
                  <CardContent className="h-full">
                    <div className="flex gap-6 h-full">
                      <div className="flex-shrink-0">
                        <Image
                          src="/christmas.jpg"
                          alt="Christmas Cat"
                          width={300}
                          height={320}
                          className="object-cover rounded-lg"
                          style={{ aspectRatio: '15/16' }}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-600 mb-4">
                          Leave a comment for Golden.
                        </p>
                    {!posted.slide3 ? (
                      <div className="space-y-3">
                        <input
                          name="name"
                          placeholder="Your name"
                          value={formData.slide3.name}
                          onChange={(e) => handleFormChange("slide3", "name", e.target.value)}
                          className="w-full p-2 border rounded-md"
                          style={{ borderColor: '#d1d5db' }}
                          disabled={isSubmitting.slide3}
                        />
                        <textarea
                          name="message"
                          placeholder="Your message for Golden..."
                          value={formData.slide3.message}
                          onChange={(e) => handleFormChange("slide3", "message", e.target.value)}
                          className="w-full p-2 border rounded-md resize-none"
                          style={{ borderColor: '#d1d5db' }}
                          rows={3}
                          disabled={isSubmitting.slide3}
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSubmit("slide3")}
                            disabled={isSubmitting.slide3}
                            className="flex-1 px-4 py-2 text-white rounded transition-colors disabled:opacity-50"
                            style={{ backgroundColor: '#ff5900' }}
                          >
                            {isSubmitting.slide3 ? 'Posting...' : 'Comment'}
                          </button>
                          <button
                            onClick={() =>
                              toast("You have liked this post", {
                                description: "Like has been sent to Golden",
                                action: {
                                  label: "Undo",
                                  onClick: () => console.log("Undo"),
                                },
                              })
                            }
                            className="px-4 py-2 text-white rounded transition-colors"
                            style={{ backgroundColor: '#ff5900' }}
                          >
                            Like 
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="mb-4">
                        <div className="bg-gray-100 p-4 rounded-md border-l-4 border-red-500">
                          <p className="text-sm text-gray-600 mb-1">Your Comment:</p>
                          <p className="text-gray-800">{formData.slide3.message}</p>
                        </div>
                        <button
                          onClick={() =>
                          toast("You have liked this post", {
                            description: "Like has been sent to Golden",
                            action: {
                              label: "Undo",
                              onClick: () => console.log("Undo"),
                            },
                          })
                          }
                          className="w-full px-4 py-2 text-white rounded transition-colors mt-2"
                          style={{ backgroundColor: '#ff5900' }}
                        >
                          Like 
                        </button>
                      </div>
                    )}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <p className="text-sm text-gray-500">Posted Today</p>
                  </CardFooter>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious 
              style={{ 
                backgroundColor: '#ff5900', 
                borderColor: '#ff5900',
                color: 'white'
              }}
              className="hover:opacity-80 transition-opacity"
            />
            <CarouselNext 
              style={{ 
                backgroundColor: '#ff5900', 
                borderColor: '#ff5900',
                color: 'white'
              }}
              className="hover:opacity-80 transition-opacity"
            />
          </Carousel>
          </div>
        </div>

        {/* Right Half - Recent Messages */}
        <div className="flex-1 max-w-lg">
          <h2 className="text-lg font-semibold text-orange-900 mb-4">Messages for Golden</h2>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20 h-[28rem]">
            <MessageList />
          </div>
        </div>
      </div>

    </div>
  );
}
