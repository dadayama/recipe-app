export type RecipePost = {
  id?: string;
  title: string;
  img: string;
  ingredients: string[];
  steps: string[];
  comments?: string;
  createdAt?: Date;
};

export type RecipeListProps = {
  posts: RecipePost[];
};
