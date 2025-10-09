import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { RequestHandler } from "express";

const tempStub = {
  score: 50,
};

export const getHealth: RequestHandler = async (_req, res, _next) => {
  return res.send();
};

export const getReadiness: RequestHandler = async (_req, res, _next) => {
  return res.send();
};

export const getDate: RequestHandler = async (_req, res, _next) => {
  return res.json({ date: new Date() });
};

export const getScore: RequestHandler = async (_req, res, _next) => {
  return res.json({ score: tempStub.score });
};

export const putScore: RequestHandler = async (req, res, _next) => {
  if (!req.body.score) {
    throw new Error("Request body does not contain score.");
  }

  tempStub.score = req.body.score;
  return res.json(req.body);
};

export const getVersion: RequestHandler = async (_req, res, _next) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const packageJsonPath = join(__dirname, "../../package.json");
    const packageJson = await readFile(packageJsonPath, "utf-8");
    const { version } = JSON.parse(packageJson);
    return res.json({ version });
  } catch (_error) {
    throw new Error("Failed to read version information.");
  }
};
