const mongoose = require("mongoose");
const express = require("express");

const app = express();
app.use(express.json());

const connect = () => {
  return mongoose.connect("mongodb://127.0.0.1:27017/fun");
  console.log("connecter to database");
};

//movie schema
const movieSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  movieName: { type: String, required: true },
  releaseDate: { type: Date, required: false },
  grener: { type: String, required: true },
});

const Movies = mongoose.model("movies", movieSchema);

//see all movies
app.get("/movies", async (req, res) => {
  const movies = await Movies.find();
  return res.status(200).send({ movies });
});

//add a new movie
app.post("/movies", async (req, res) => {
  const movies = await Movies.create(req.body);
  return res.status(200).send({ movies });
});

//get a single movie
app.get("/movies/:id", async (req, res) => {
  let movie = await Movies.findById(req.params.id).lean().exec();
  return res.status(200).send({ movie });
});

//update a movie
app.patch("/movies/:id", async (req, res) => {
  const movies = await Movies.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  return res.status(200).send({ movies });
});

//delete a movie
app.delete("/movies/:id", async (req, res) => {
  const movies = await Movies.findByIdAndDelete(req.params.id);
  return res.status(200).send({
    deltedItem: movies,
  });
});

//lisnter
app.listen(2345, async () => {
  await connect();
  console.log("listing into port 2345");
});
