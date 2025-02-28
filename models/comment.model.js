import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({
  name: { type: string },
  email: { type: string },
  text: { type: string }, 
  date: { type: Date },
  movie_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    require: true,
  },
});

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;
