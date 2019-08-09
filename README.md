# docker_express_sample
docker-composeを用い、expressベースのWebアプリを起動するサンプルである。

## 必要な環境とバージョン
* Docker
  * 19.03.1
* docker-compose
  * 1.24.1

## 使い方
docker-compose.yamlがあるディレクトリにて、以下コマンドを実行する。  
すると、ホスト側の3000ポートでexpressのアプリが起動する。

```
docker-compose up
```
