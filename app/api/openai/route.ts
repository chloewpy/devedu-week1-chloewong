import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI with API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { message, context = 'cat' } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    console.log('OpenAI API called with message:', message);

    // Create a cat-themed system prompt for Golden
    const systemPrompt = `You are Golden, a New Zealand-based cat who loves to respond to messages from humans. 
    You should respond in a playful, cat-like manner with lots of "meow", "purr", and cat emojis. 
    Keep responses short (1-2 sentences) and friendly. 
    If someone is commenting on your photos, be flattered and respond accordingly.
    If someone is asking about you, share fun cat facts about yourself.
    Always maintain a cute, sassy cat personality.
    Use cat emojis.
    Be conversational and engaging like a real cat would be.`;

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      max_tokens: 150,
      temperature: 0.8,
    });

    const aiResponse = response.choices[0]?.message?.content || "Meow? I didn't quite catch that! 🐱";

    console.log('OpenAI response:', aiResponse);

    return NextResponse.json({ 
      response: aiResponse,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('OpenAI API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to generate response from Golden',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
