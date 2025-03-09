// app/recipes/page.tsx
'use client';
import { useAuthStore } from '@/store/authStore';
import { useState } from 'react';

const RecipeForm = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const { user } = useAuthStore();

  const submitRecipe = async () => {
    if (!user) return;

    const recipe = { title, ingredients, userId: user.uid };
    try {
      const res = await fetch('/api/recipes', {
        method: 'POST',
        body: JSON.stringify(recipe),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      console.log('Recipe saved:', data);
    } catch (error) {
      console.error('Error submitting recipe:', error);
    }
  };

  return (
    <div>
      <input
        type='text'
        placeholder='Recipe Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder='Ingredients'
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />
      <button onClick={submitRecipe}>Submit Recipe</button>
    </div>
  );
};

export default RecipeForm;
