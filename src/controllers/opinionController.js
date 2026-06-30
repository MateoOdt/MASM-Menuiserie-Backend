import { Opinion } from "../models/Opinion.js";

// GET /api/opinions — list all opinions (newest first)
export async function getOpinions(req, res, next) {
  try {
    const opinions = await Opinion.find().sort({ createdAt: -1 });
    res.json({ count: opinions.length, data: opinions });
  } catch (err) {
    next(err);
  }
}

// POST /api/opinions — create a new opinion
export async function createOpinion(req, res, next) {
  try {
    const { name, note, comment } = req.body;

    const opinion = await Opinion.create({ name, note, comment });
    res.status(201).json({ data: opinion });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ error: "Validation failed", details: messages });
    }
    next(err);
  }
}
