import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebaseConfig';
import { RecipePost } from '@/types/recipe';
export async function getAllRecipes() {
  try {
    const querySnapshot = await getDocs(collection(db, 'recipes'));

    // ドキュメントが存在する場合、取得したデータを配列に変換
    const recipes = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return recipes;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw new Error('Failed to fetch recipes');
  }
}

// レシピを新しく追加する関数
export async function addRecipe({
  title,
  img,
  ingredients,
  steps,
  comments,
}: RecipePost) {
  try {
    const recipeRef = collection(db, 'recipes');

    // Firestoreに新しいレシピを追加
    const docRef = await addDoc(recipeRef, {
      title,
      img,
      ingredients,
      steps,
      comments,
      createdAt: serverTimestamp(),
    });

    // 追加したレシピのIDを返す
    return { id: docRef.id, title, img, ingredients, steps, comments };
  } catch (error) {
    console.error('Error adding recipe: ', error);
    throw new Error('Failed to add recipe');
  }
}
