import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import RecipeCard from '../RecipeCard/RecipeCard';

type Props = {
  posts: any;
};

const RecipeList = ({ posts }: Props) => {
  return (
    <>
      <ul>
        {posts && posts.length > 0 ? (
          posts.map((post) => <RecipeCard key={post.id} post={post} />)
        ) : (
          <p>レシピがありません</p>
        )}
      </ul>
    </>
  );
};

export default RecipeList;
