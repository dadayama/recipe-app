import { RecipePost } from '@/types/recipe';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const RecipeCard = ({ post }: { post: RecipePost }) => {
  const { id, title, img, comments, ingredients } = post;
  return (
    <li key={id}>
      <Link href={`recipe/${id}`}>
        <h3>{title}</h3>
        {img && (
          <div>
            <Image src={img} width={300} height={200} alt={title} />
          </div>
        )}
        <p>{comments}</p>
        <p>材料：{ingredients}</p>
      </Link>
    </li>
  );
};

export default RecipeCard;
