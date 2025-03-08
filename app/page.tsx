import RecipeList from '@/components/RecipeList/RecipeList';
import React from 'react';

const Home = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/getAllRecipeData`
  );

  if (!res.ok) {
    console.log('APIエラー');
  }

  console.log(res);

  const data = await res.json();
  console.log(data);

  const posts = data.recipeList;

  return <RecipeList posts={posts} />;
};

export default Home;
