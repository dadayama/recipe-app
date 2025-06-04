'use client';

import { useState } from 'react';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useRouter } from 'next/navigation';

import styles from '@/components/Form/Form.module.scss';
import { db, storage } from '@/lib/firebaseConfig';

type FormValues = {
  img: FileList;
  title: string;
  ingredients: string;
  steps: { value: string }[];
  comments?: string;
};
const schema: yup.ObjectSchema<FormValues> = yup.object({
  img: yup
    .mixed<FileList>()
    .test('fileRequired', '画像を選択してください', (value) => {
      return value instanceof FileList && value.length > 0;
    })
    .required(),
  title: yup.string().required('レシピ名は必須です'),
  ingredients: yup.string().required('材料は必須です'),
  steps: yup
    .array()
    .of(
      yup.object({
        value: yup.string().required('手順は必須です'),
      })
    )
    .min(1, '最低1つ手順が必要です')
    .required(),
  comments: yup.string().optional(),
});

const Form = () => {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      title: '',
      ingredients: '',
      steps: [{ value: '' }, { value: '' }, { value: '' }],
      comments: '',
    },
    resolver: yupResolver(schema),
  });

  const { fields, append } = useFieldArray({
    control,
    name: 'steps',
  });

  const onFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const storageRef = ref(storage, `image/${file.name}`);
    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setImgUrl(url);
    } catch (err) {
      console.error('Upload error', err);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const recipeRef = collection(db, 'recipes');
      await addDoc(recipeRef, {
        slug: '',
        img: imgUrl,
        title: data.title,
        ingredients: data.ingredients,
        steps: data.steps.map((step) => step.value),
        comments: data.comments,
        createdAt: serverTimestamp(),
      });
      router.push('/');
      reset();
      setImgUrl(null);
    } catch (err) {
      console.error('Firestore add error', err);
    }
  };

  return (
    <div className={styles.formWrap}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formInner}>
          <div className={styles.inputField}>
            <label htmlFor='img' className={styles.fieldTitle}>
              <span>必須：</span>
              写真
            </label>
            <input
              type='file'
              id='img'
              accept='.png, .jpeg, .jpg'
              {...register('img')}
              onChange={(e) => {
                onFileUpload(e);
                register('img').onChange(e);
              }}
            />
            {errors.img && (
              <p className={styles.error} role='alert'>
                {errors.img.message}
              </p>
            )}
            {imgUrl && (
              <div className={styles.preview}>
                <img src={imgUrl} alt='プレビュー' width={300} />
              </div>
            )}
          </div>

          <div className={styles.inputField}>
            <label htmlFor='title' className={styles.fieldTitle}>
              <span>必須：</span>
              レシピ名
            </label>
            <input
              type='text'
              id='title'
              {...register('title')}
              className={styles.w500}
            />
            {errors.title && (
              <p className={styles.error} role='alert'>
                {errors.title.message}
              </p>
            )}
          </div>

          <div className={styles.inputField}>
            <label htmlFor='ingredients' className={styles.fieldTitle}>
              <span>必須：</span>
              材料
            </label>
            <input
              type='text'
              id='ingredients'
              {...register('ingredients')}
              className={styles.w500}
            />
            {errors.ingredients && (
              <p className={styles.error} role='alert'>
                {errors.ingredients.message}
              </p>
            )}
          </div>

          <div className={styles.inputField}>
            <div role='group' aria-labelledby='stepsLabel'>
              <p id='stepsLabel' className={styles.fieldTitle}>
                <span>必須：</span>
                作り方
              </p>
              {fields.map((field, index) => (
                <div className={styles.stepsContent} key={field.id}>
                  <label htmlFor={`steps.${index}.value`}>
                    手順{index + 1}
                  </label>
                  <textarea
                    id={`steps.${index}.value`}
                    {...register(`steps.${index}.value`)}
                    className={styles.w500}
                  />
                  {errors.steps?.[index]?.value && (
                    <p className={styles.error} role='alert'>
                      {errors.steps[index]?.value?.message}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div className={styles.stepAddBtn}>
              <button type='button' onClick={() => append({ value: '' })}>
                手順を増やす
              </button>
            </div>
          </div>

          <div className={styles.inputField}>
            <label htmlFor='comments' className={styles.fieldTitle}>
              ひとことコメント
            </label>
            <input
              type='text'
              id='comments'
              {...register('comments')}
              className={styles.w500}
            />
          </div>

          <div className={styles.addButtonWrap}>
            <button type='submit' disabled={isSubmitting}>
              レシピを投稿する
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
