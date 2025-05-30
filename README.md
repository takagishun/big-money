# Big Money - 家計簿アプリ

React Router v7、PostgreSQL、Prisma、AWS Cognitoを使用した家計簿Webアプリです。

## 技術スタック

- **フロントエンド**: React Router v7, TypeScript, Tailwind CSS
- **バックエンド**: React Router v7 (SSR)
- **データベース**: PostgreSQL
- **ORM**: Prisma
- **認証**: AWS Cognito (Amplify)
- **開発環境**: Docker Compose

## 開発環境のセットアップ

### 1. 必要な環境

- Node.js 18以上
- Docker & Docker Compose
- AWS アカウント（Cognito用）

### 2. プロジェクトのセットアップ

```bash
# リポジトリをクローン
git clone https://github.com/[your-username]/big-money.git
cd big-money

# 依存関係をインストール
npm install

# 環境変数をセットアップ
cp .env.example .env
# .envファイルを編集してCognito設定を追加
```

### 3. データベースのセットアップ

```bash
# PostgreSQLをDocker Composeで起動
npm run docker:up

# Prismaクライアントを生成
npm run db:generate

# データベースにスキーマを適用
npm run db:push
```

### 4. AWS Cognitoの設定

1. AWS コンソールでCognitoユーザープールを作成
2. アプリクライアントを設定
3. `.env`ファイルに以下の値を設定：
   - `VITE_AWS_USER_POOL_ID`
   - `VITE_AWS_USER_POOL_WEB_CLIENT_ID`

### 5. 開発サーバーの起動

```bash
# 開発サーバーを起動
npm run dev
```

## 利用可能なスクリプト

- `npm run dev` - 開発サーバーを起動
- `npm run build` - プロダクション用にビルド
- `npm run start` - プロダクションサーバーを起動
- `npm run typecheck` - TypeScriptの型チェック
- `npm run db:generate` - Prismaクライアントを生成
- `npm run db:push` - スキーマをデータベースにプッシュ
- `npm run db:migrate` - マイグレーションを実行
- `npm run db:studio` - Prisma Studioを起動
- `npm run docker:up` - PostgreSQLコンテナを起動
- `npm run docker:down` - PostgreSQLコンテナを停止

## アーキテクチャ

### スケーラビリティ対応

このアプリは最初はAWS Amplifyでホスティングしますが、将来的にECS/Fargateなどの別構成に移行可能です：

1. **現在**: Amplify Hosting + Cognito
2. **スケール後**: ECS/Fargate + ALB + Cognito

Cognitoの認証機能は独立しているため、ホスティング部分のみを変更すれば移行できます。

## デプロイ

### AWS Amplifyでのデプロイ

1. **Cognitoユーザープールの作成**
   ```bash
   # AWS CLIでCognitoユーザープールを作成
   aws cognito-idp create-user-pool --pool-name big-money-users
   aws cognito-idp create-user-pool-client --user-pool-id [USER_POOL_ID] --client-name big-money-app
   ```

2. **Amplifyアプリの作成**
   ```bash
   # AWS Amplify CLIでアプリを作成
   amplify init
   amplify add hosting
   ```

3. **GitHub Secretsの設定**
   - `AWS_ACCESS_KEY_ID`: AWS アクセスキー
   - `AWS_SECRET_ACCESS_KEY`: AWS シークレットアクセスキー
   - `AMPLIFY_APP_ID`: AmplifyアプリのID

4. **環境変数をAmplifyに設定**
   - `VITE_AWS_REGION`: ap-northeast-1
   - `VITE_AWS_USER_POOL_ID`: Cognitoユーザープール ID
   - `VITE_AWS_USER_POOL_WEB_CLIENT_ID`: Cognitoアプリクライアント ID

### CI/CDパイプライン

- **トリガー**: mainブランチへのpush・PR
- **チェック**: TypeScript、Biome lint、テスト、ビルド
- **デプロイ**: mainブランチへのpushで自動デプロイ

## 開発の進め方

1. データベーススキーマを拡張（`prisma/schema.prisma`）
2. マイグレーションを実行（`npm run db:migrate`）
3. APIルートを追加（`app/routes/api/`）
4. フロントエンドコンポーネントを実装（`app/components/`）
5. 認証フローを統合