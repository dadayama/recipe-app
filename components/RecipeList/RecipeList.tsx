import { RecipeListProps } from '@/types/recipe';
import RecipeCard from '../RecipeCard/RecipeCard';
import styles from './RecipeList.module.scss';

const RecipeList = ({ posts }: RecipeListProps) => {
  return (
    <>
      <div className={styles.recipeWrap}>
        <h2>レシピ一覧</h2>
        <ul className={styles.recipeList}>
          {posts && posts.length > 0 ? (
            posts.map((post) => {
              return <RecipeCard key={post.id} post={post} />;
            })
          ) : (
            <p>レシピがありません</p>
          )}
        </ul>
      </div>
    </>
  );
};

export default RecipeList;
