import { Router } from "express";
import movieRoutes from "./movie.route.js";
import commentRoutes from "./comment.route.js"

const router = Router();

router.use("/movies", movieRoutes);
router.use("/comments", commentRoutes);

export default router;
