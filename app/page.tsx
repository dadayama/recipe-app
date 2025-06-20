import RecipeList from '@/components/RecipeList/RecipeList';
import React from 'react';

const Home = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recipes`);
  if (!res.ok) {
    throw new Error('Failed to fetch recipes');
  }
  const data = await res.json();

  return (
    <>
      <h1 style={{ paddingInline: '24px' }}>わたしレシピ</h1>{' '}
      <RecipeList posts={data} />
    </>
  );
};

export default Home;
