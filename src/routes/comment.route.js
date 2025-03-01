import { Router } from "express";
import Comment from "../models/comment.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
