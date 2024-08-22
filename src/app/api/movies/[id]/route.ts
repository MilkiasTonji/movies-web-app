import { NextResponse } from 'next/server';


const url = process.env.NEXT_PUBLIC_BASE_URL;


const getMovieByIdHandler = async (token: string, id: string) => {
    const response = await fetch(`${url}/movies/${id}`, {
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${token}`, 
      },
    });
  
    const res = await response.json();
  
    return res;
  };


  const updateMovieHandler = async (movieData: FormData, token: string, id: string) => {
    const response: any = await fetch(`${url}/movies/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: movieData,
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
      const urlParts = req.url.split('/');
      const id = urlParts[urlParts.length - 1];
      const result = await getMovieByIdHandler(token, id);
      return NextResponse.json(result);
    } catch (err) {
      console.error("Error fetching movies:", err);
      return NextResponse.json({ success: false, message: 'Failed to fetch movies' }, { status: 500 });
    }
  }


  export async function PUT(req: Request) {
    try {
        const token = req.headers.get('Authorization')?.split(' ')[1];
        if (!token) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const formData = await req.formData();
        const urlParts = req.url.split('/');
        const id = urlParts[urlParts.length - 1];

        const result = await updateMovieHandler(formData, token, id);
        return NextResponse.json(result);
    } catch (err) {
        console.error("Error adding movie:", err);
        return NextResponse.json({ success: false, message: 'Failed to add movie' }, { status: 500 });
    }
}
