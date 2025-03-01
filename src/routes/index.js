import { Router } from "express";
import movieRoutes from "./movie.route.js"

const router = Router();

router.use("/movies", movieRoutes)


export default router;