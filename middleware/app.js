const express = require("express")
const app = express()

app.use((req, res, next) => {
  console.log("First middleware")
  next()
  console.log("Bye from-  First middleware")
})

app.use("/", (req, res, next) => {
  console.log("Second middleware")
  next()
  //   return next()
  //   res.send("Exit from second middleware")
  console.log("Bye from-  second middleware")
})

app.use("/dog", (req, res, next) => {
  console.log("Middleware with path")
  //   next()
  res.send("Exit from Middleware with path")
  console.log("Bye from-  Middleware with path")
})

app.get("/", (req, res) => {
  res.send("This is home page")
})

app.get("/cat", (req, res) => {
  res.send("Meow Meoow")
})

app.get("/dog", (req, res) => {
  res.send("Woof Wooof")
})

const verify = (req, res, next) => {
  const { password } = req.query
  if (password == "1234") {
    next()
  } else {
    res.send("Invalid Password !!!")
  }
}

app.get("/secret", verify, (req, res, next) => {
  res.send(" Secret")
  console.log("bye from secret")
})

app.listen("3000", () => {
  console.log("Server running at port 3000")
})
