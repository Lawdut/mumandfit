const express = require("express");
const app = express();
const cors = require("cors");
const bdd = require("./models/controllerpool.js");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const salt = bcrypt.genSaltSync(10);
/*const mysqlStore = require('express-mysql-session')(session);
const sessionStore = new mysqlStore(options);*/
/*const multer = require("multer");
const sharp = require("sharp");
const path = require("path");*/

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended : true}, {limit: '50mb'}));

                    // ----- JWT ----- //
function generateAccessToken(user) {
    return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: "24h" });
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


                    // ----- Nettoyage des données ----- //
  function clean(unArticle){
    const unArticleToClean = unArticle; 

    for(let i in unArticleToClean['unArticle']){
      if (typeof unArticleToClean['unArticle'][i] === 'string'){
          unArticleToClean['unArticle'][i] = unArticleToClean['unArticle'][i].replace("\'","&apos;").replace("-", "&#45;");
      } 
    }
    return unArticleToClean;
  }


app.post('/inscription', function (req, res) {
    
    //console.log(req.body);
    bdd.inscription('user', req.body, function(err) {
        if (err) {
            res.status(500).send({ message: err });
          }
        res.json({res : "Enregistré"})
    })
});

app.post('/connexion', function (req, res) {
  bdd.connexion('user', req.body, function(user){
    console.log("data :", user[0].mdp)
    const isValidPass = bcrypt.compareSync(req.body.password, user[0].mdp);
    console.log(isValidPass);
    if(isValidPass) {
      console.log(user[0]);
      const token = generateAccessToken({
        email : user[0].email,
        role : user[0].role,
      });
      console.log(token);
      res.status(200).send(token);
    }
    else{
      res.send("Le mot de passe est invalide");
    }
  })
})

app.get('/getAllArticles', function (req, res) {
  bdd.getAllArticles('articles', function (articles) {
    res.json({articles : articles});
    //console.log(articles);
  })
})

app.post('/modifArticle/', function(req, res){
    //console.log(req.body);
    let unArticleCleaned = clean(req.body);
    bdd.updateArticle('articles', unArticleCleaned, function(err){
      if (err) {
        res.status(500).send({ message: err });
      }
    
    res.json({res : "Enregistré"})
    })
})

app.listen(8010)