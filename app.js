import express from "express";
import Movie from "./models/movie.model.js";

const app = express();

app.use(express.json());

// ✅ Route 1 : Récupérer tous les films (limités à 10)
app.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find().select("plot genres poster title").limit(10);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});


export default app;
