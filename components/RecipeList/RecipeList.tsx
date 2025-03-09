import { RecipeListProps, RecipePost } from '@/types/recipe';
import RecipeCard from '../RecipeCard/RecipeCard';

const RecipeList = ({ posts }: RecipeListProps) => {
  return (
    <>
      <ul>
        {posts && posts.length > 0 ? (
          posts.map((post) => {
            console.log(post); // ここで post の内容を確認
            return <RecipeCard key={post.id} post={post} />;
          })
        ) : (
          <p>レシピがありません</p>
        )}
      </ul>
    </>
  );
};

export default RecipeList;
