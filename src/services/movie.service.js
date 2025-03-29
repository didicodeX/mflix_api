import Movie from "../models/movie.model.js";

/**
 * 🔍 Récupérer tous les films avec une option de tri et de pagination
 */
export const getAllMoviesService = async (limit = 10, page = 1, sortBy = "title") => {
  const movies = await Movie.find()
    .select("title plot genres poster")
    .sort({ [sortBy]: 1 }) // Tri par titre (ascendant par défaut)
    .skip((page - 1) * limit) // Pagination
    .limit(limit);

  return movies;
};

/**
 * 🎥 Récupérer un film par ID avec une gestion d'erreur avancée
 */
export const getMovieByIdService = async (id) => {
  const movie = await Movie.findById(id);
  if (!movie) throw new Error("Film introuvable");
  return movie;
};

/**
 * ✅ Ajouter un film en vérifiant les doublons et en validant les données
 */
export const createMovieService = async (movieData) => {
  const { title, plot, genres, poster } = movieData;

  // Vérifier si le film existe déjà par son titre (case insensitive)
  const existingMovie = await Movie.findOne({ title: { $regex: new RegExp("^" + title + "$", "i") } });
  if (existingMovie) throw new Error("Un film avec ce titre existe déjà");

  // Vérifier que tous les champs obligatoires sont présents
  if (!title || !plot || !genres || !poster) throw new Error("Tous les champs sont requis");

  const newMovie = new Movie(movieData);
  return await newMovie.save();
};

/**
 * ✏️ Modifier un film en empêchant certains champs d'être modifiés
 */
export const updateMovieService = async (id, updateData) => {
  const allowedUpdates = ["plot", "genres", "poster"]; // On interdit la modification du titre
  const updates = Object.keys(updateData);

  // Vérifier si l'utilisateur essaie de modifier des champs interdits
  const isValidUpdate = updates.every((field) => allowedUpdates.includes(field));
  if (!isValidUpdate) throw new Error("Modification non autorisée sur certains champs");

  const updatedMovie = await Movie.findByIdAndUpdate(id, updateData, { new: true });
  if (!updatedMovie) throw new Error("Film introuvable");
  return updatedMovie;
};

/**
 * ❌ Supprimer un film avec confirmation
 */
export const deleteMovieService = async (id) => {
  const deletedMovie = await Movie.findByIdAndDelete(id);
  if (!deletedMovie) throw new Error("Film introuvable");
  return { message: "Film supprimé avec succès" };
};
