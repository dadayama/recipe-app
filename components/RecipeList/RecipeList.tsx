import { RecipeListProps } from '@/types/recipe';
import RecipeCard from '../RecipeCard/RecipeCard';
import styles from './RecipeList.module.scss';

const RecipeList = ({ posts }: RecipeListProps) => {
  return (
    <>
      <ul className={styles.recipeList}>
        {posts && posts.length > 0 ? (
          posts.map((post) => {
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
