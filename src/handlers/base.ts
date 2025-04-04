import { RequestHandler } from "express"

const tempStub = {
  score: 50,
}

export const getHealth: RequestHandler = async (req, res, next) => {
  return res.send()
}

export const getReadiness: RequestHandler = async (req, res, next) => {
  return res.send()
}

export const getDate: RequestHandler = async (req, res, next) => {
  return res.json({ date: new Date() })
}

export const getScore: RequestHandler = async (req, res, next) => {
  return res.json({ score: tempStub.score })
}

export const putScore: RequestHandler = async (req, res, next) => {
  if (!req.body.score) {
    throw new Error("Request body does not contain score.")
  }

  tempStub.score = req.body.score
  return res.json(req.body)
}