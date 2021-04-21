let mongodb = require("mongodb")

// mongodb
//   .connect("mongodb://localhost:27017/movieApp", { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(client => {
//     const db = client.db()
//     runQueries(db)
//   })
//   .catch(err => console.log(err))

mongodb.connect("mongodb://localhost:27017/movieApp", { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
  const db = client.db()
  runQueries(db)
})

function runQueries(db) {
  db.collection("movies")
    .findOne({ name: "superman" })
    .then(data => console.log(data))
    .catch(err => console.log(err))
}
