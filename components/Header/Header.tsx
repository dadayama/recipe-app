import Link from 'next/link';
import styles from '@/components/Header/Header.module.scss';

const Header = () => {
  return (
    <header>
      <div className={styles.inner}>
        <nav>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <Link href='/'>ホーム</Link>
            </li>
            <li>
              <Link href='/recipes'>レシピ一覧</Link>
            </li>
            <li>
              <Link href='/new-recipe'>投稿する</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
