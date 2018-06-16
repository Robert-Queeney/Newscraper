
const express = require("express"); 
const mongoose = require("mongoose"); 
const bodyParser = require("body-parser"); 
const request = reqiire("request"); 

const axios = require("axios"); 
const cheerio = require("cheerio"); 

var db = require("./models");

var PORT = 3000;

let app = express(); 

app.use(logger("dev")); 

app.use(bodyParser.urlencoded({ extended:true })); 

app.use(express.static("public")); 

mongoose.connect("mongodb://localhost/newscraper");