import express from "express";
import Movie from "./src/models/movie.model.js";
import routes from "./src/routes/index.js";

const app = express();

app.use(express.json());


app.use("/",routes)



export default app;
