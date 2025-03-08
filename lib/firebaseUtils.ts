// lib/firebaseUtils.ts

import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';

export async function getAllRecipes() {
  try {
    const querySnapshot = await getDocs(collection(db, 'recipes'));
    console.log('-------------');
    console.log(querySnapshot.docs);
    console.log('-------------');

    // ドキュメントが存在する場合、取得したデータを配列に変換
    const recipes = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log('Fetched recipes:', recipes); // データのログ出力
    return recipes;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw new Error('Failed to fetch recipes');
  }
}
