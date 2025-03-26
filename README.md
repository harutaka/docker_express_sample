# docker_express_sample
dockerを用い、expressベースのWebアプリを起動するサンプルである。

## API サーバー起動方法

#### 環境構築

初回は以下コマンドを実行。  
npm ci でもよい。npm ci は環境変数 NODE_ENV が production の場合、  
-D オプション付きでインストールした（開発用の）パッケージをインストールしない

```
$ npm install
```

#### 開発時

```
$ npm run dev
```

#### 通常起動

```
$ npm run build
$ npm start
```
