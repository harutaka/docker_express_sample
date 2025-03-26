import express, { Request, Response, NextFunction } from "express"
import base from "./routes/base.js"

export const app = express()

app.use(express.json())

// サーバ情報を出力しないようにする
app.disable("x-powered-by")

const path = "/"
app.use(path, base) // 基本ルーティング

app.use(path, (req: Request, res: Response) => {
  // エンドポイントが存在しない
  return res.status(404).json({ code: 1002, message: "Not found" })
})

app.use(path, (err: Error, req: Request, res: Response, next: NextFunction) => {
  // サーバーエラー
  if (err) {
    console.error(err.message)
    return res.status(500).json({ message: err.message })
  }
})

// APIサーバー起動
const port = parseInt(process.env.PORT ?? "3000")
const server = app.listen(port, (err?: Error) => {
  if (err) throw err
  console.log(`Web server (port: ${port}) start...`)
})
export default server
