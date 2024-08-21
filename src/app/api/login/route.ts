import { NextResponse } from 'next/server';
import { UserType } from '@/types';

const url = process.env.NEXT_PUBLIC_BASE_URL;

const loginHandler = async ({ email, password }: UserType) => {
  const response: any = await fetch(`${url}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const res = await response.json();
  console.log("What: ", res)

  return res;
};

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json(); // Parse the JSON body


    const result = await loginHandler({ email, password });
    const { success, token, message } = result;

    // Return the response using NextResponse
    return NextResponse.json({ success, token, message });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: 'Internal Server Error', token: '' }, { status: 500 });
  }
}
