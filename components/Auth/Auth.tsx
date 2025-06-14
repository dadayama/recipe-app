'use client';
import { useState } from 'react';
import styles from './Auth.module.css'; // CSS Modules読み込み
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { useAuthStore } from '@/store/authStore';
import { auth } from '@/lib/firebaseConfig';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user } = useAuthStore();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  };

  const signup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  };

  if (user) {
    return (
      <div className={styles.welcome}>
        Welcome, <strong>{user.email}</strong>!
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ログイン / サインアップ</h1>
      <input
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.input}
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
      />
      <div className={styles.buttonGroup}>
        <button
          onClick={login}
          className={`${styles.button} ${styles.loginBtn}`}
        >
          ログイン
        </button>
        <button
          onClick={signup}
          className={`${styles.button} ${styles.signupBtn}`}
        >
          新規登録
        </button>
      </div>
    </div>
  );
};

export default Auth;
