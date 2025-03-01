import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String },
  text: { type: String }, 
  date: { type: Date },
  movie_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    require: true,
  },
});

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;
