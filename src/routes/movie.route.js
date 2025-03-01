import { Router } from "express";
import Movie from "../models/movie.model.js";
const router = Router();

// ✅ Route 1 : Récupérer tous les films (limités à 10)
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find()
      .select("title plot genres poster ")
      .limit(10);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// ✅ Route 2 : Récupérer un film par ID
router.get("/movies/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ error: "Film non trouvé" });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// ✅ Route 3 : Ajouter un film
router.post("/movies", async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(400).json({ error: "Données invalides" });
  }
});

// ✅ Route 4 : Modifier un film
router.put("/movies/:id", async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMovie) return res.status(404).json({ error: "Film non trouvé" });
    res.json(updatedMovie);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// ✅ Route 5 : Supprimer un film
router.delete("/movies/:id", async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    if (!deletedMovie) return res.status(404).json({ error: "Film non trouvé" });
    res.json({ message: "Film supprimé !" });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
