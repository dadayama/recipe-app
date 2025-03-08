import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const RecipeCard = (post) => {
  console.log('post', post.post.img);

  return (
    <li key={post.id}>
      <Link href={`recipe/${post.post.id}`}>
        <h3>{post.post.title}</h3>
        <div>
          {/* <img src={post.post.img || null} alt='Description' /> */}
          <Image
            src={post.post.img || null}
            alt='Description'
            width={300}
            height={200}
          />
        </div>
        <p>{post.post.comments}</p>
        <p>材料：{post.post.ingredients}</p>
      </Link>
    </li>
  );
};

export default RecipeCard;
