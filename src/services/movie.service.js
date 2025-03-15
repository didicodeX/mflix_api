import Movie from "../models/movie.model.js";

// ✅ Récupérer tous les films avec une limite
export const getAllMoviesService = async (limit = 10) => {
  return await Movie.find().select("title plot genres poster").limit(limit);
};

// ✅ Récupérer un film par ID
export const getMovieByIdService = async (id) => {
  return await Movie.findById(id);
};

// ✅ Ajouter un film
export const createMovieService = async (movieData) => {
  const newMovie = new Movie(movieData);
  return await newMovie.save();
};

// ✅ Modifier un film
export const updateMovieService = async (id, updateData) => {
  return await Movie.findByIdAndUpdate(id, updateData, { new: true });
};

// ✅ Supprimer un film
export const deleteMovieService = async (id) => {
  return await Movie.findByIdAndDelete(id);
};
