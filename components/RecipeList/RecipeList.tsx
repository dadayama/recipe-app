import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import RecipeCard from '../RecipeCard/RecipeCard';

type Props = {
  title: 'string';
  posts: any;
};

const RecipeList = ({ posts }: Props) => {
  return (
    <>
      <ul>
        {posts?.map((post) => (
          <RecipeCard post={post} />
        ))}
      </ul>
    </>
  );
};

export default RecipeList;
