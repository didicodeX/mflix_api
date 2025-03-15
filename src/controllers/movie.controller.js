import {
  getAllMoviesService,
  getMovieByIdService,
  createMovieService,
  updateMovieService,
  deleteMovieService,
} from "../services/movie.service.js";

// ✅ Récupérer tous les films
export const getAllMovies = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const movies = await getAllMoviesService(limit);
    res.status(200).json(movies);
  } catch (err) {
    console.error("Erreur dans getAllMovies:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// ✅ Récupérer un film par ID
export const getMovie = async (req, res) => {
  try {
    const movie = await getMovieByIdService(req.params.id);
    if (!movie) return res.status(404).json({ error: "Film non trouvé" });
    res.json(movie);
  } catch (err) {
    console.error("Erreur dans getMovie:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// ✅ Ajouter un film
export const createMovie = async (req, res) => {
  try {
    const newMovie = await createMovieService(req.body);
    res.status(201).json(newMovie);
  } catch (err) {
    console.error("Erreur dans createMovie:", err);
    res.status(400).json({ error: "Données invalides" });
  }
};

// ✅ Modifier un film
export const updateMovie = async (req, res) => {
  try {
    const updatedMovie = await updateMovieService(req.params.id, req.body);
    if (!updatedMovie) return res.status(404).json({ error: "Film non trouvé" });
    res.json(updatedMovie);
  } catch (err) {
    console.error("Erreur dans updateMovie:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// ✅ Supprimer un film
export const deleteMovie = async (req, res) => {
  try {
    const deletedMovie = await deleteMovieService(req.params.id);
    if (!deletedMovie) return res.status(404).json({ error: "Film non trouvé" });
    res.json({ message: "Film supprimé !" });
  } catch (err) {
    console.error("Erreur dans deleteMovie:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
