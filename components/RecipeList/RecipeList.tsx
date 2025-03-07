import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  title: 'string';
  posts: any;
};

const RecipeList = ({ title, posts }: Props) => {
  return (
    <>
      <section>
        <h2>{title}</h2>
        <ul>
          {posts?.map((post) => (
            <li key={post.id}>
              <Link href={`recipe/${post.id}`}>
                <h3>{post.title}</h3>
                <div>
                  <Image
                    src={post.img}
                    width={100}
                    height={100}
                    alt='仮のalt'
                  />
                </div>
                <p>{post.comments}</p>
                <p>材料：{post.ingredients}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default RecipeList;
