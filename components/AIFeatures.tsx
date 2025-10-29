"use client";

import { useState } from 'react';
import { OpenAIService, RandomUserService, type OpenAIResponse, type RandomUserResponse } from '@/lib/openaiService';
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function AIFeatures() {
  const [aiResponse, setAiResponse] = useState<OpenAIResponse | null>(null);
  const [randomUser, setRandomUser] = useState<RandomUserResponse | null>(null);
  const [isGeneratingResponse, setIsGeneratingResponse] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [userMessage, setUserMessage] = useState('');

  const handleGenerateResponse = async () => {
    if (!userMessage.trim()) {
      toast.error('Please enter a message for Golden!');
      return;
    }

    setIsGeneratingResponse(true);
    try {
      const response = await OpenAIService.generateResponse(userMessage, 'cat');
      setAiResponse(response);
      toast.success('Golden responded! 🐱');
    } catch (error) {
      console.error('Error generating response:', error);
      toast.error('Failed to get response from Golden. Please try again.');
    } finally {
      setIsGeneratingResponse(false);
    }
  };

  const handleGetRandomUser = async () => {
    setIsLoadingUser(true);
    try {
      const user = await RandomUserService.getRandomUser();
      setRandomUser(user);
      toast.success('Found a new cat lover! 🐾');
    } catch (error) {
      console.error('Error fetching random user:', error);
      toast.error('Failed to fetch random user. Please try again.');
    } finally {
      setIsLoadingUser(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* OpenAI Chat Feature */}
      <Card className="w-full shadow-xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-orange-700 text-2xl">Chat with Golden 🐱</CardTitle>
          <p className="text-gray-600">Ask Golden anything and get a cat-themed response!</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <textarea
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Type a message for Golden..."
              className="w-full p-4 border border-orange-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none shadow-sm transition-all duration-200"
              rows={4}
              disabled={isGeneratingResponse}
            />
          </div>
          <Button
            onClick={handleGenerateResponse}
            disabled={isGeneratingResponse || !userMessage.trim()}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg py-3 shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl"
          >
            {isGeneratingResponse ? 'Golden is thinking... 🐱' : 'Ask Golden Something!'}
          </Button>
          
          {aiResponse && (
            <div className="p-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border-l-4 border-orange-400 shadow-lg">
              <p className="text-sm text-gray-600 mb-2 font-medium">Golden says:</p>
              <p className="text-gray-800 font-medium text-lg leading-relaxed">{aiResponse.response}</p>
              <p className="text-sm text-gray-500 mt-3">
                {new Date(aiResponse.timestamp).toLocaleTimeString()}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Random User Feature */}
      <Card className="w-full shadow-xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-orange-700 text-2xl">Meet a Random Cat Lover 🐾</CardTitle>
          <p className="text-gray-600">Discover fellow cat enthusiasts from around the world!</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <Button
            onClick={handleGetRandomUser}
            disabled={isLoadingUser}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg py-3 shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl"
          >
            {isLoadingUser ? 'Finding a cat lover...' : 'Find Random Cat Lover'}
          </Button>
          
          {randomUser && (
            <div className="p-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border-l-4 border-orange-400 shadow-lg">
              <div className="flex items-center space-x-4">
                <img
                  src={randomUser.picture}
                  alt={randomUser.name}
                  className="w-20 h-20 rounded-full object-cover shadow-md border-2 border-white"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-xl">{randomUser.name}</h3>
                  <p className="text-gray-600 text-lg">@{randomUser.username}</p>
                  <p className="text-gray-500">{randomUser.location}</p>
                  <p className="text-sm text-gray-400 mt-1">{randomUser.email}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
