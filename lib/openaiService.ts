export interface OpenAIResponse {
  response: string;
  timestamp: string;
}

export interface RandomUserResponse {
  name: string;
  email: string;
  picture: string;
  location: string;
  username: string;
}

export class OpenAIService {
  static async generateResponse(message: string, context?: string): Promise<OpenAIResponse> {
    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, context }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      throw error;
    }
  }
}

export class RandomUserService {
  static async getRandomUser(): Promise<RandomUserResponse> {
    try {
      const response = await fetch('/api/random-user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error calling Random User API:', error);
      throw error;
    }
  }
}
