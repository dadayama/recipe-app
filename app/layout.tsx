import type { Metadata } from 'next';
import './globals.scss';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

export const metadata: Metadata = {
  title: 'わたしレシピ',
  description: 'あなただけのレシピアプリです',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
