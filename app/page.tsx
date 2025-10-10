"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Image from "next/image";

export default function Home() {
  const [comments, setComments] = useState({
    slide1: "",
    slide2: "",
    slide3: ""
  });
  const [posted, setPosted] = useState({
    slide1: false,
    slide2: false,
    slide3: false
  });

  const handlePost = (slide: string) => {
    if (comments[slide as keyof typeof comments].trim()) {
      setPosted(prev => ({ ...prev, [slide]: true }));
      toast("Comment posted successfully!", {
        description: "Your comment has been saved.",
      });
    } else {
      toast("Please enter a comment first", {
        description: "The text area cannot be empty.",
      });
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ffd3a5' }}>
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
      
      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        <Carousel
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            <CarouselItem>
              <Card className="w-full max-w-md mx-auto">
      <CardHeader>
                  <CardTitle>Felt cute might delete later</CardTitle>
      </CardHeader>
      <CardContent>
                  <div className="mb-4">
                    <Image
                      src="/cute.jpg"
                      alt="Cute Cat"
                      width={300}
                      height={320}
                      className="mx-auto object-cover rounded-lg"
                      style={{ aspectRatio: '15/16' }}
                    />
                  </div>
                  <p className="text-gray-600 mb-4">
                    Send a message to Golden.
                  </p>
                  {!posted.slide1 ? (
                    <>
                      <textarea
                        placeholder="Enter your message here..."
                        className="w-full p-2 border rounded-md mb-4 resize-none"
                        style={{
                          borderColor: comments.slide1.trim() ? '#ff5900' : '#d1d5db',
                          borderWidth: comments.slide1.trim() ? '2px' : '1px'
                        }}
                        rows={2}
                        value={comments.slide1}
                        onChange={(e) => setComments(prev => ({ ...prev, slide1: e.target.value }))}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handlePost("slide1")}
                          className="flex-1 px-4 py-2 text-white rounded transition-colors"
                          style={{ backgroundColor: comments.slide1.trim() ? '#ff5900' : '#ffaa6e' }}
                        >
                          Post Comment
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
                    </>
                  ) : (
                    <div className="mb-4">
                      <div className="bg-gray-100 p-4 rounded-md border-l-4 border-blue-500">
                        <p className="text-sm text-gray-600 mb-1">Your Comment:</p>
                        <p className="text-gray-800">{comments.slide1}</p>
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
      </CardContent>
      <CardFooter>
                  <p className="text-sm text-gray-500">Posted Today</p>
      </CardFooter>
    </Card>
            </CarouselItem>
            <CarouselItem>
              <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                  <CardTitle>Unemployment-maxxing</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
              <Image
                src="/lazy.jpg"
                alt="Lazy Cat"
                width={300}
                height={320}
                className="mx-auto object-cover rounded-lg"
                style={{ aspectRatio: '15/16' }}
              />
                  </div>
                  <p className="text-gray-600 mb-4">
                    Send a message to Golden.
                  </p>
                  {!posted.slide2 ? (
                    <>
                      <textarea
                        placeholder="Send a message to Golden..."
                        className="w-full p-2 border rounded-md mb-4 resize-none"
                        style={{
                          borderColor: comments.slide2.trim() ? '#ff5900' : '#d1d5db',
                          borderWidth: comments.slide2.trim() ? '2px' : '1px'
                        }}
                        rows={2}
                        value={comments.slide2}
                        onChange={(e) => setComments(prev => ({ ...prev, slide2: e.target.value }))}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handlePost("slide2")}
                          className="flex-1 px-4 py-2 text-white rounded transition-colors"
                          style={{ backgroundColor: comments.slide2.trim() ? '#ff5900' : '#ffaa6e' }}
                        >
                          Post Comment
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
                    </>
                  ) : (
                    <div className="mb-4">
                      <div className="bg-gray-100 p-4 rounded-md border-l-4 border-green-500">
                        <p className="text-sm text-gray-600 mb-1">Your Comment:</p>
                        <p className="text-gray-800">{comments.slide2}</p>
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
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-gray-500">Posted Today</p>
                </CardFooter>
              </Card>
            </CarouselItem>
            <CarouselItem>
              <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                  <CardTitle>Merry Christmas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Image
                      src="/christmas.jpg"
                      alt="Christmas Cat"
                      width={300}
                      height={320}
                      className="mx-auto object-cover rounded-lg"
                      style={{ aspectRatio: '15/16' }}
                    />
                  </div>
                  <p className="text-gray-600 mb-4">
                    Send a message to Golden.
                  </p>
                  {!posted.slide3 ? (
                    <>
                      <textarea
                        placeholder="Send a message to Golden..."
                        className="w-full p-2 border rounded-md mb-4 resize-none"
                        style={{
                          borderColor: comments.slide3.trim() ? '#ff5900' : '#d1d5db',
                          borderWidth: comments.slide3.trim() ? '2px' : '1px'
                        }}
                        rows={2}
                        value={comments.slide3}
                        onChange={(e) => setComments(prev => ({ ...prev, slide3: e.target.value }))}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handlePost("slide3")}
                          className="flex-1 px-4 py-2 text-white rounded transition-colors"
                          style={{ backgroundColor: comments.slide3.trim() ? '#ff5900' : '#ffaa6e' }}
                        >
                          Post Comment
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
                    </>
                  ) : (
                    <div className="mb-4">
                      <div className="bg-gray-100 p-4 rounded-md border-l-4 border-red-500">
                        <p className="text-sm text-gray-600 mb-1">Your Comment:</p>
                        <p className="text-gray-800">{comments.slide3}</p>
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
    </div>
  );
}
