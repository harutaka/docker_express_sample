# docker_express_sample

TypeScript + Express ベースのWebアプリをDockerイメージ化することを想定した、プロジェクトサンプルです。ボイラーテンプレートとして活用する想定です。

## プロジェクト構成

このプロジェクトは以下のディレクトリ構成で構築されています。

### ディレクトリ構成

- `src/app.ts` - Express サーバー設定を含むメインアプリケーションエントリーポイント
- `src/routes/` - ルート定義（現在は base.ts のみ）
- `src/handlers/` - 機能別に分離されたリクエストハンドラー
- `src/libs/` - ユーティリティ関数と共有コード
- `tests/` - Vitest でグローバルテスト関数を使用するテストファイル

### 主要パターン

- ES モジュールを使用（package.json で type: "module"）
- Express ハンドラーは express の RequestHandler 型に従う
- ルートは別ファイルに整理され、app.ts にインポート
- 単純な状態管理のため tempStub オブジェクトを使用したインメモリデータストレージ
- カスタムエラーレスポンスと 404/500 ステータスコードによるエラーハンドリング
- TypeScript コンパイルターゲットは ES2022、Node16 モジュール解決

### API エンドポイント

src/routes/base.ts で定義されている現在のエンドポイント：

- `GET /health` - ヘルスチェックエンドポイント
- `GET /readiness` - レディネスチェックエンドポイント
- `GET /date` - 現在の日付を返す
- `GET /score` - インメモリストアから現在のスコアを返す
- `PUT /score` - インメモリストアのスコアを更新
- `GET /version` - アプリケーションのバージョン情報を返す（package.jsonから取得）

## ローカル開発手順

1. **初回セットアップ**

```bash
pnpm install
```

このコマンドで依存関係のモジュールをインストールします。

2. **git hookを設定**

```bash
pnpm run prepare
```

このコマンドでコミット前に自動フォーマットを適用するgit hookを設定します。

3. **開発サーバーの起動**

```bash
pnpm run dev  # 開発サーバーを起動
```

## よく使うコマンド

### 開発

- `pnpm run dev` - tsx を使用してホットリロード付きの開発サーバーを起動
- `pnpm run build` - TypeScript を ./dist ディレクトリの JavaScript にコンパイル
- `pnpm run start` - ./dist/src/app からコンパイル済みアプリケーションを実行

### コード品質

- `pnpm run lint` - src/\*_/_.ts と tests に対して Biome リンターを実行
- `pnpm run format` - Biome フォーマッターを使用してコードをフォーマット
- `pnpm run test` - Vitest を使用してテストを実行

### Docker

- `docker compose up` - コンテナ内でアプリケーションをビルドし、ポート 3000 で実行
