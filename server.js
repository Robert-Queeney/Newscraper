// required
const express = require("express");
 
const bodyParser = require("body-parser");
const request = require("request");
// axios is promise based http library  and cheerio to scrape
const axios = require("axios");
const cheerio = require("cheerio");

const mongoose = require("mongoose");

var db = require("./models");

var PORT = 3000;
    
let app = express();

// app.use(logger("dev")); 

app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static("public")); 
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/newscraper");

app.get("/scrape", function (req, res) {
    axios.get("http://www.chicagotribune.com/").then(function (response) {
        let $ = cheerio.load(response.data);
        $("article h3").each(function (i, element) {
            let result = {};

            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");

            db.articles.create(result)
                .then(function (dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    return res.json(err)
                    console.error("You blew it")
                });
        });
        res.send("Scrape complete");
         
    })
})

// Route for getting all Articles from the db
app.get("/articles", function(req, res) {
    // Grab every document in the Articles collection
    db.articles.find()
      .then(function(dbArticle) {
        // If we were able to successfully find Articles, send them back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });



// server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});
