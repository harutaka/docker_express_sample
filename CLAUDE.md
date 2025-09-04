# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリのコードを扱う際のガイドラインを提供します。

## コマンド

### 開発
- `pnpm dev` - tsx を使用してホットリロード付きの開発サーバーを起動
- `pnpm build` - TypeScript を ./dist ディレクトリの JavaScript にコンパイル
- `pnpm start` - ./dist/src/app からコンパイル済みアプリケーションを実行

### コード品質
- `pnpm lint` - src/**/*.ts と __tests__ に対して Biome リンターを実行
- `pnpm format` - Biome フォーマッターを使用してコードをフォーマット
- `pnpm test` - Vitest を使用してテストを実行

### Docker
- `docker compose up` - コンテナ内でアプリケーションをビルドし、ポート 3000 で実行
- マルチステージ Dockerfile で本番環境向けに最適化（ビルド、モジュールインストール、ランタイムの各ステージを分離）

## アーキテクチャ

### プロジェクト構造
- `src/app.ts` - Express サーバー設定を含むメインアプリケーションエントリーポイント
- `src/routes/` - ルート定義（現在は base.ts のみ）
- `src/handlers/` - 機能別に分離されたリクエストハンドラー
- `src/libs/` - ユーティリティ関数と共有コード
- `__tests__/` - Vitest でグローバルテスト関数を使用するテストファイル

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

### テスト
- グローバル有効化された Vitest を使用
- テストファイルは .spec.ts または .test.ts 命名規則を使用
- テストは __tests__/ ディレクトリに配置

### コード品質ツール
- リントとフォーマットに Biome を使用（biome.jsonc で設定）
- JavaScript 文字列にはダブルクォート
- 行幅 100 文字
- スペースインデント