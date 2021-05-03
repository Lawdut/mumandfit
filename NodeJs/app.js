const express = require("express");
const app = express();
const cors = require("cors");
const bdd = require("./models/controllerpool.js");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const salt = bcrypt.genSaltSync(10);
/*const mysqlStore = require('express-mysql-session')(session);
const sessionStore = new mysqlStore(options);*/
/*const multer = require("multer");
const sharp = require("sharp");
const path = require("path");*/

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

                    // ----- JWT ----- //
function generateAccessToken(user) {
    return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: "20m" });
}

function authenticateToken(req, res, next) {
    // const token = req.headers["x-access-token"];
  
    console.log("req header : ", req.headers);
    const token = req.headers["authorization"];
    console.log("token: ", token);
    if (token == null) {
      return res.sendStatus(401);
    }
  
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
  
      req.user = user;
  
      next();
    });
  }


app.post('/inscription', function (req, res) {
    console.log('hello');
    console.log(req.body);
    bdd.inscription('user', req.body, function(err) {
        if (err) {
            res.status(500).send({ message: err });
          }
        res.json({res : "Enregistré"})
    })
})

app.get('/getAllArticles', function (req, res) {
  bdd.getAllArticles('articles', function (articles) {
    res.json({articles : articles});
    console.log(articles);
  })
})

app.listen(8010)