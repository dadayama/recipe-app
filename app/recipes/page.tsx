import RecipeList from '@/components/RecipeList/RecipeList';
import React from 'react';

const Recipes = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/AllRecipeData`);

  const data = await res.json();
  console.log(data);

  return (
    <div>
      レシピページです
      <RecipeList posts={data} />
    </div>
  );
};

export default Recipes;
