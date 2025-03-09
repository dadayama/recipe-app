import RecipeList from '@/components/RecipeList/RecipeList';
import React from 'react';

const Home = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/getAllRecipeData`
  );
  const data = await res.json();

  return <RecipeList posts={data} />;
};

export default Home;
