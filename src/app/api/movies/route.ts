import { NextResponse } from 'next/server';
import { MovieType } from '@/types';

const url = process.env.NEXT_PUBLIC_BASE_URL;


const fetchMovies = async (token: string) => {
    const response = await fetch(`${url}/movies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
    });
  
    const res = await response.json();
    return res;
  };
  
  export async function GET(req: Request) {
    try {
      const token = req.headers.get('Authorization')?.split(' ')[1]; 
  
      if (!token) {
        return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
      }
  
      const result = await fetchMovies(token);
      return NextResponse.json(result);
    } catch (err) {
      console.error("Error fetching movies:", err);
      return NextResponse.json({ success: false, message: 'Failed to fetch movies' }, { status: 500 });
    }
  }
  