'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useRouter } from 'next/navigation';

import styles from '@/components/Form/Form.module.scss';
import { db, storage } from '@/lib/firebaseConfig';

const Form = () => {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [recipes, setRecipes] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState<string[]>([]);
  const [stepCount, setStepCount] = useState(3);
  const [comments, setComments] = useState('');
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
    if (!file) return console.error('No file selected');

    const storageRef = ref(storage, `image/${file.name}`);
    uploadBytes(storageRef, file)
      .then(() => getDownloadURL(storageRef))
      .then((url) => setImgUrl(url))
      .catch((error) => console.error('File upload error:', error));
  };

  const handleAddStep = () => {
    setStepCount((prev) => prev + 1);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const recipeRef = collection(db, 'recipes');
      const docRef = await addDoc(recipeRef, {
        slug: '',
        img: imgUrl,
        title: recipes,
        ingredients,
        steps,
        comments,
        createdAt: serverTimestamp(),
      });
      console.log('Document written with ID:', docRef.id);
      router.push('/');
      clearForm();
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  const clearForm = () => {
    setRecipes('');
    setIngredients('');
    setSteps(Array(stepCount).fill(''));
    setImgUrl(null);
    setComments('');
  };

  return (
    <div className={styles.formWrap}>
      <form onSubmit={onSubmit}>
        <div className={styles.formInner}>
          {/* 写真 */}
          <div className={styles.inputField}>
            <label htmlFor='img' className={styles.fieldTitle}>
              写真
            </label>
            <input
              type='file'
              name='img'
              id='img'
              accept='.png, .jpeg, .jpg'
              onChange={onFileUpload}
            />
            {imgUrl && (
              <div className={styles.preview}>
                <img
                  src={imgUrl}
                  alt='アップロードされた写真のプレビュー'
                  width={300}
                />
              </div>
            )}
          </div>

          {/* レシピ名 */}
          <div className={styles.inputField}>
            <label htmlFor='recipe' className={styles.fieldTitle}>
              レシピ名
            </label>
            <input
              type='text'
              id='recipe'
              value={recipes}
              onChange={(e) => setRecipes(e.target.value)}
              autoComplete='off'
              className={styles.w500}
            />
          </div>

          {/* 材料 */}
          <div className={styles.inputField}>
            <label htmlFor='ingredients' className={styles.fieldTitle}>
              材料
            </label>
            <input
              type='text'
              id='ingredients'
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              autoComplete='off'
              className={styles.w100}
            />
          </div>

          {/* 作り方 */}
          <div className={styles.inputField}>
            <div role='group' aria-labelledby='stepsLabel'>
              <p id='stepsLabel' className={styles.fieldTitle}>
                作り方
              </p>
              {[...Array(stepCount)].map((_, index) => (
                <div className={styles.stepsContent} key={index}>
                  <label htmlFor={`step-${index}`}>手順{index + 1}</label>
                  <textarea
                    id={`step-${index}`}
                    value={steps[index] || ''}
                    onChange={(e) => handleStepChange(e, index)}
                    className={styles.w500}
                  />
                </div>
              ))}
            </div>
            <div className={styles.stepAddBtn}>
              <button type='button' onClick={handleAddStep}>
                手順を増やす
              </button>
            </div>
          </div>

          {/* コメント */}
          <div className={styles.inputField}>
            <label htmlFor='comment' className={styles.fieldTitle}>
              ひとことコメント
            </label>
            <input
              type='text'
              id='comment'
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              autoComplete='off'
              className={styles.w500}
            />
          </div>

          {/* 追加ボタン */}
          <div className={styles.addButtonWrap}>
            <button type='submit'>レシピを投稿する</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
