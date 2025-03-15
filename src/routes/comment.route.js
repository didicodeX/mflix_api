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

// 2. Récupérer un commentaire spécifique par son ID
router.get('/:id', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: "Commentaire non trouvé" });
    }
    res.json(comment);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// // 3. Récupérer tous les commentaires avec l'événement (ici, le film associé)
// // En utilisant populate pour récupérer les infos de "Movie"
// router.get('/with-event/all', async (req, res) => {
//   try {
//     const comments = await Comment.find().populate('movie_id');
//     res.json(comments);
//   } catch (err) {
//     res.status(500).json({ error: "Erreur serveur" });
//   }
// });

// // 4. Récupérer un commentaire spécifique avec l'événement associé
// router.get('/:id/with-event', async (req, res) => {
//   try {
//     const comment = await Comment.findById(req.params.id).populate('movie_id');
//     if (!comment) {
//       return res.status(404).json({ error: "Commentaire non trouvé" });
//     }
//     res.json(comment);
//   } catch (err) {
//     res.status(500).json({ error: "Erreur serveur" });
//   }
// });

// Route pour poster un commentaire sur un film donné
router.post('/movies/:movieId', async (req, res) => {
  try {
    const { name, email, text } = req.body;
    const movieId = req.params.movieId;
    
    // Validation de base (vous pouvez l'améliorer avec un middleware)
    if (!name || !email || !text) {
      return res.status(400).json({ error: "Veuillez fournir name, email et text." });
    }
    
    // Création d'un nouveau commentaire avec la date actuelle
    const newComment = new Comment({
      name,
      email,
      text,
      date: new Date(),
      movie_id: movieId,
    });

    // Sauvegarde dans la base de données
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// 5. Modifier un commentaire en particulier (mise à jour)
router.put('/:id', async (req, res) => {
  try {
    // Utilise req.body pour récupérer les champs à mettre à jour
    const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedComment) {
      return res.status(404).json({ error: "Commentaire non trouvé" });
    }
    res.json(updatedComment);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// 6. Supprimer un commentaire spécifique
router.delete('/:id', async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);
    if (!deletedComment) {
      return res.status(404).json({ error: "Commentaire non trouvé" });
    }
    res.json({ message: "Commentaire supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// 7. Supprimer tous les commentaires d'un événement (par exemple, d'un film)
// On utilise ici movie_id pour identifier l'événement (ou film)
router.delete('/movies/:movieId', async (req, res) => {
  try {
    const result = await Comment.deleteMany({ movie_id: req.params.movieId });
    res.json({ message: `${result.deletedCount} commentaire(s) supprimé(s)` });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// 8. Supprimer TOUS les commentaires de la collection
router.delete('/', async (req, res) => {
  try {
    const result = await Comment.deleteMany({});
    res.json({ message: `${result.deletedCount} commentaire(s) supprimé(s)` });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
