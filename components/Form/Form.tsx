'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import styles from '@/components/Form/Form.module.scss';
import { db, storage } from '@/lib/firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useRouter } from 'next/navigation';

const Form = () => {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<string>('');
  const [ingredients, setIngredients] = useState<string>('');
  const [steps, setSteps] = useState<string[]>([]);
  const [stepCount, setStepCount] = useState<number>(3);
  const [comments, setComments] = useState<string>('');
  const router = useRouter();

  const handleStepChange = (
    e: ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    const newSteps = [...steps];
    newSteps[index] = e.target.value;
    setSteps(newSteps);
  };

  const onFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const storageRef = ref(storage, 'image/' + file.name);
      uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(storageRef).then((url) => setImgUrl(url));
      });
    } else {
      console.error('No file selected');
    }
  };

  const handleAddStep = () => {
    setStepCount(stepCount + 1);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const recipeRef = collection(db, 'recipes');

      const docRef = await addDoc(recipeRef, {
        slug: '',
        img: imgUrl,
        title: recipes,
        ingredients: ingredients,
        steps: steps,
        comments: comments,
        createdAt: serverTimestamp(),
      });
      console.log('document written with ID: ', docRef.id);
      router.push('/');
      clearForm();
    } catch (error) {
      console.log('Error adding document: ', error);
    }
  };
  const clearForm = () => {
    setRecipes('');
    setIngredients('');
    setSteps(['', '', '']);
    setImgUrl('');
    setComments('');
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <div className={styles.inputField}>
          <label htmlFor='img' className={styles.fieldTitle}>
            写真
          </label>
          <input
            type='file'
            name='img'
            id='img'
            accept='.png ,.jpeg, .jpg'
            onChange={onFileUpload}
          />
          <img src={imgUrl || undefined} />
        </div>
        <div className={styles.inputField}>
          <label htmlFor='recipe' className={styles.fieldTitle}>
            レシピ名
          </label>
          <input
            type='text'
            value={recipes}
            onChange={(e) => {
              setRecipes(e.target.value);
            }}
            id='recipe'
            autoComplete='off'
            className={styles.w500}
          />
        </div>
        <div className={styles.inputField}>
          <label htmlFor='ingredients' className={styles.fieldTitle}>
            材料
          </label>
          <input
            id='ingredients'
            type='text'
            value={ingredients}
            onChange={(e) => {
              setIngredients(e.target.value);
            }}
            autoComplete='off'
            className={styles.w100}
          />
        </div>
        <div className={styles.inputField}>
          <div role='group' aria-labelledby='recipeLabel'>
            <p id='recipeLabel' className={styles.fieldTitle}>
              作り方
            </p>
            {[...Array(stepCount)].map((_, index) => (
              <div className={styles.stepsContent} key={index}>
                <label htmlFor='recipeStep'>手順{index + 1}</label>
                <textarea
                  name='recipe1'
                  id='recipeStep'
                  onChange={(e) => handleStepChange(e, index)}
                  value={steps[index]}
                  className={styles.w500}
                ></textarea>
              </div>
            ))}
          </div>
          <div className={styles.stepAddBtn}>
            <button type='button' onClick={handleAddStep}>
              手順を増やす
            </button>
          </div>
        </div>
        <div className={styles.inputField}>
          <label htmlFor='comment'>ひとことコメント</label>
          <input
            type='text'
            name='comment'
            id='comment'
            onChange={(e) => setComments(e.target.value)}
            value={comments}
            autoComplete='off'
            className={styles.w500}
          />
        </div>
        <div className={styles.addBtn}>
          <button type='submit'>追加する</button>
        </div>
      </form>
    </>
  );
};

export default Form;
