// POST リクエストの処理
import { NextRequest, NextResponse } from 'next/server';
import { addRecipe } from '@/lib/firebaseUtils'; // Firebaseにレシピを追加する関数

export async function POST(req: NextRequest) {
  try {
    // リクエストボディを取得
    const { title, img, ingredients, steps, comments } = await req.json();

    // レシピをFirebaseに追加
    const newRecipe = await addRecipe({
      title,
      img,
      ingredients,
      steps,
      comments,
    });

    return NextResponse.json(newRecipe, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
