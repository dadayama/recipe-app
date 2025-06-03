// GET リクエストの処理
import { NextResponse } from 'next/server';
import { getAllRecipes } from '@/lib/firebaseUtils';

export async function GET() {
  try {
    const response = await getAllRecipes();

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
