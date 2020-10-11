//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us18.api.mailchimp.com/3.0/lists/88ac2244ff";

  const options = {
    method: "POST",
    auth: "lydell1:24348b494b48cb0d1d349eb8edd80a38-us18"
  };

  const request = https.request(url, options, function(response) {

    response.on("data", function(data) {
      const mailchimp = JSON.parse(data);
      console.log(JSON.parse(data));
      console.log(mailchimp.error_count);

      if (mailchimp.error_count > 0) {
        res.sendFile(__dirname + "/failure.html");
      } else {
        res.sendFile(__dirname + "/success.html");
      }
    });
  });

  request.write(jsonData);
  request.end();

});

app.post("/failure", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000");
});

// API key
// 624ec259df59d9ee77971834d8bfb61e-us18

// List id
// 88ac2244ff
