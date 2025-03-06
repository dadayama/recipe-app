import Link from 'next/link';
import styles from 'Button.module.scss';

type Props = {
  children: string;
  color: string;
  href: string;
};

const Button = ({ children, color, href }: Props) => {
  return (
    <Link href={href} className={`${styles[color]} ${styles.button}`}>
      {children}
    </Link>
  );
};

export default Button;
