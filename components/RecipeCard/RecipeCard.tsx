import { RecipePost } from '@/types/recipe';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from './RecipeCard.module.scss';

const RecipeCard = ({ post }: { post: RecipePost }) => {
  const { id, title, img, comments, ingredients } = post;
  return (
    <li key={id} className={styles.recipeItem}>
      <Link href={`recipe/${id}`}>
        <h3>{title}</h3>
        {img && (
          <div className={styles.recipeImg}>
            <Image src={img} width={300} height={200} alt={title} />
          </div>
        )}
        <div className={styles.recipeBody}>
          <p>コメント：{comments}</p>
          <p>材料：{ingredients}</p>
        </div>
      </Link>
    </li>
  );
};

export default RecipeCard;
