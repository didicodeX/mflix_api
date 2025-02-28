import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
  plot: { type: String },
  genres: { type: [String] },
  runtime: { type: Number },
  cast: { type: [String] },
  num_mflix_comments: { type: Number },
  title: { type: String },
  fullplot: { type: String },
  languages: { type: [String] },
  released: { type: Date },
  directors: { type: [String] },
  rate: { type: String },
  awards: {type: Object},
  lastupdated: { type: String },
  year: { type: Number },
  imdb: {type: Object},
  countries: { type: [String] },
  type: { type: String },
  tomatoes: {type: Object},
});

const Movie = mongoose.model("Movie", MovieSchema);
export default Movie;
