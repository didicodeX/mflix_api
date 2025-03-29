import Comment from "../models/comment.model.js";
import Movie from "../models/movie.model.js";

// ✅ Créer un commentaire
export const createComment = async (req, res) => {
  try {
    const { name, email, text, movie_id } = req.body;

    // Vérifier si le film existe
    const movieExists = await Movie.findById(movie_id);
    if (!movieExists) {
      return res.status(404).json({ message: "Film non trouvé" });
    }

    const newComment = new Comment({
      name,
      email,
      text,
      date: new Date(),
      movie_id,
    });

    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// ✅ Récupérer les commentaires d'un film
export const getCommentsByMovie = async (req, res) => {
  try {
    const { movie_id } = req.params;
    const comments = await Comment.find({ movie_id }).sort({ date: -1 });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// ✅ Mettre à jour un commentaire
export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, text } = req.body;

    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { name, email, text, date: new Date() },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ message: "Commentaire non trouvé" });
    }

    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// ✅ Supprimer un commentaire
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedComment = await Comment.findByIdAndDelete(id);

    if (!deletedComment) {
      return res.status(404).json({ message: "Commentaire non trouvé" });
    }

    res.status(200).json({ message: "Commentaire supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
