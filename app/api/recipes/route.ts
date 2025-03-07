// app/api/recipes/route.ts
import { NextResponse } from 'next/server';
import { db } from '../../../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export async function POST(request: Request) {
  try {
    const { title, ingredients, userId } = await request.json();

    // Firestoreにレシピを保存
    const docRef = await addDoc(collection(db, 'recipes'), {
      title,
      ingredients,
      userId,
      createdAt: new Date(),
    });

    return NextResponse.json({ id: docRef.id }, { status: 200 });
  } catch (error) {
    console.error('Error saving recipe:', error);
    return NextResponse.json(
      { error: 'Failed to save recipe' },
      { status: 500 }
    );
  }
}
