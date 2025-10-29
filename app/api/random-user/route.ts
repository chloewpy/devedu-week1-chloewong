import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  try {
    // Fetch random user data from randomuser.me API
    const response = await axios.get('https://randomuser.me/api/?inc=name,email,picture,location&nat=us,gb,ca,au,nz');
    
    const user = response.data.results[0];
    
    // Format the data for our use
    const formattedUser = {
      name: `${user.name.first} ${user.name.last}`,
      email: user.email,
      picture: user.picture.large,
      location: `${user.location.city}, ${user.location.country}`,
      username: user.login?.username || user.name.first.toLowerCase() + user.name.last.toLowerCase(),
    };

    return NextResponse.json(formattedUser);

  } catch (error) {
    console.error('Random User API error:', error);
    
    // Fallback data in case the API fails
    const fallbackUser = {
      name: "Anonymous Cat Lover",
      email: "catlover@example.com",
      picture: "https://via.placeholder.com/150/FFD3A5/000000?text=🐱",
      location: "Somewhere in the world",
      username: "catlover",
    };

    return NextResponse.json(fallbackUser);
  }
}
