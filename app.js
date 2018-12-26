const express = require("express")
const path = require("path")
const app = express()
const port = process.env.PORT || 8888



// Add this
app.use(express.static(__dirname + '/public'))

// This
app.set('views', path.join(__dirname, '/public'))

// And This
app.set("view engine", "jade")

app.get("/", (req, res, next) => {
  res.render("index")
})


app.listen(port, (err) => {
  if (err) {
    throw err
  } else
    console.log(`Server is running on port ${port}`)
})