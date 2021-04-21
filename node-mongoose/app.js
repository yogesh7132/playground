const mongoose = require("mongoose")
mongoose
  .connect("mongodb://localhost:27017/movieApp", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connection Open"))
  .catch(err => console.log("Error: ", err))

// Schema with Validation
const movieSchema = new mongoose.Schema({ name: { type: String, required: true, maxLength: 30 }, score: { type: Number, min: 0, max: 10 }, year: Number, isWatched: { type: Boolean, default: false } })

//Model
const Movie = mongoose.model("Movie", movieSchema)
// const Movie = mongoose.model("Movie", { name: String, score: Number, year: Number, isWatched: Boolean })

// const saveMovie = new Movie({ name: "Galaxy", score: 4, year: 2017, isWatched: false })
// saveMovie.save().then(() => console.log("movie saved"))

//Queries
async function runQueries() {
  // deleteMany
  // await Movie.deleteMany().then(data => console.log(data))

  // insertMany
  const insertValues = [{ name: "spiderman" }, { name: "superman", score: 6, year: 2017, isWatched: true }, { name: "Galaxy", score: 4, year: 2017, isWatched: false }, { name: "Cosmic", score: 5, year: 2017, isWatched: true }]
  // await Movie.insertMany(insertValues).then(data => console.log("inserted"))

  //update
  // await Movie.updateOne({ name: "spiderman" }, { name: "Hulk" }).then(data => console.log(data))

  // find
  // await Movie.find().then(data => console.log(data))

  //findById
  await Movie.findById({ _id: "608028349466c23b5c0eaaec" }).then(data => console.log(data))
}

runQueries()
