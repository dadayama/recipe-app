# Recipe App
レシピを投稿・閲覧できるアプリです。

## 特徴
- ユーザーがレシピを投稿・編集・削除できる
- Firebase Storage に画像をアップロード可能
- Next.js（App Router）を使用した高速な表示
- TypeScriptで型安全に実装
- アクセシビリティを考慮したマークアップ

## 使用技術
| 技術 | 説明 |
|---------|---------|
| Next.js | フロントエンドフレームワーク |
| TypeScript | 型安全な開発 |
| Material-UI | UIライブラリ |
| TypeScript | 型安全な開発 |

## フォルダ構成
```
recipe-app
 ├── app
 │   ├── recipe (レシピ詳細ページ)
 │   ├── page.tsx (トップページ)
 ├── components
 │   ├── RecipeList.tsx (レシピ一覧コンポーネント)
 │   ├── RecipeCard.tsx (レシピカードコンポーネント)
 ├── types
 │   ├── recipe.ts (型定義)
 ├── public
 │   ├── images (画像フォルダ)
 ├── next.config.js
 ├── package.json
 └── README.md
```


## セットアップ
1. **リポジトリをクローン**
```
git clone https://github.com/dadayama/recipe-app.git
cd recipe-app
```

2. **環境変数を設定**
.env.local を作成して以下の値を設定
このプロジェクトでは、以下の環境変数を使用します。`.env.local` ファイルを作成し、必要な値を設定してください。
```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_FIREBASE_MEASUREMENTID
NEXT_PUBLIC_API_URL
```
  
4. 依存関係をインストール
```
npm install
```

5. 開発サーバーを起動
```
npm run dev
```

6. スクリーンショット

 
