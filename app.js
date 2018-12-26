const express = require("express")
// Required for assigning a path
const path = require("path")
const app = express()
// Getting data from body/UI/Postman.
const bodyParser = require("body-parser")
const nodemailer = require("nodemailer")
const port = process.env.PORT || 8888



// Add this, Serving the public folder to public, making a static server like Apache, you don't need to assign a route.
app.use(express.static(__dirname + '/public'))

// Body Parser to get the data from the body like UI or Postman. For UI
app.use(bodyParser.urlencoded({
  extended: true
}))
// For Postman.
app.use(bodyParser.json())

// This, Jade by default goes for "views" folder, changing that to public.
app.set('views', path.join(__dirname, '/public'))

// And, setting the view engine to Jade
app.set("view engine", "jade")

app.get("/", (req, res, next) => {
  res.render("index")
})


app.post("/", (req, res, next) => {
  let transporter = nodemailer.createTransport({
    host: 'gains.arrowsupercloud.com',
    port: 587,
    secure: false,
    auth: {
      user: "me@aliahmedkhan.me",
      pass: "53cRaySyCXp%dV"
    }
  });
  let mailOptions = {
    from: '"Ali Ahmed Khan" <me@aliahmedkhan.me>',
    to: `iialiahmedkhanii@gmail.com, ${req.body.email}`,
    subject: 'Hire Me Acknowledgement Email from The Hacking School Bootcamper',
    text: 'Hello?' + req.body.firstname,
    html: '<b>The following Data has been acknowledged</b>' + "<br>" + req.body.firstname + "<br>" + req.body.lastname + "<br>" + req.body.email + "<br>" + req.body.phone + "<br>" + req.body.message
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
  res.redirect("/success")
});

app.get("/success", function (req, res, next) {
  res.sendFile(__dirname + "/public/success.html")
})

app.listen(port, (err) => {
  if (err) {
    throw err
  } else
    console.log(`Server is running on port ${port}`)
});