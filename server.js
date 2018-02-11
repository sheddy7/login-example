const express = require("express");
var bodyParser = require('body-parser');
var validator = require("email-validator");

const app = express();

app.set("port", process.env.PORT || 3001);

app.use(bodyParser.json());

// Use the timeout delay to imitate a real authentication request
app.use((req, res, next) => {
  setTimeout(next, 1000)
});

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.post('/api/login', (req, res) => {

  if (validator.validate(req.body.email) && req.body.password === 'password') {
    res.json({
      "success": true
    });
  } else {
    res.json({
      "success": false,
      "message": "Invalid email and password"
    });
  }
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
