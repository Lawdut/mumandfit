const express = require("express");
const app = express();
const cors = require("cors");
const bdd = require("./models/controllerpool.js");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const fs = require('fs');
const mime = require('mime');
const fileUpload = require('express-fileupload');
dotenv.config();
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const salt = bcrypt.genSaltSync(10);
const path = require("path");
const config = require("./models/config.js")

/*const mysqlStore = require('express-mysql-session')(session);
const sessionStore = new mysqlStore(options);*/
/*const multer = require("multer");
const sharp = require("sharp");
*/

app.use(cors());
app.use(express.json({}));
app.use(express.urlencoded({extended : true}));
app.use(fileUpload({}));
                    // ----- JWT ----- //
function generateAccessToken(user) {
    return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: "24h" });
}

function authenticateToken(req, res, next) {
    // const token = req.headers["x-access-token"];
  
    //console.log("req header : ", req.headers);
    const token = req.headers["authorization"];
    //console.log("token: ", token);
    if (token == null) {
      return res.sendStatus(401);
    }
  
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403)
      }else {
        req.user = user;
  
      next();
      };
  
      
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
    //console.log(req.body);
    if(user.length !== 0 ){
      //console.log(user);
    
      const isValidPass = bcrypt.compareSync(req.body.passwd, user[0].mdp);
    
      if(isValidPass) {
        
        const token = generateAccessToken({
          email : user[0].email,
          role : user[0].role,
        });
        //console.log(token);
        res.status(200).send(token);
      }
      else{
        res.status(500).send("Le mot de passe est invalide");
      }
    }else{
      res.status(500).send('L\'utilisateur n\'existe pas');
    }
  })
})
          /* ----- AFFICHAGE ARTICLES -----*/
app.get('/getAllArticles', function (req, res) {
  bdd.getAllArticles('articles', function (articles) {
    res.json({articles : articles});
    //console.log(articles);
  })
})
          /* ----- MODIFICATION ARTICLES -----*/
app.post('/modifArticle/',authenticateToken, function(req, res){
    let unArticleCleaned = clean(req.body);
    bdd.updateArticle('articles', unArticleCleaned, function(err){
      if (err) {
        res.status(500).send({ message: err });
      }
    
    res.json({res : "Enregistré"})
    })
})
          /* ----- UPLOAD IMAGE ----- */
app.post('/jwt', (req, res) => {
  //const user = req.session.user;
  /*if (user) {
    const payload = {
      sub: user.username,        // Unique user id string
      name: user.fullname,       // Full name of user
      exp: Math.floor(Date.now() / 1000) + (60 * 10) // 10 minutes expiration
    };

    // When this is set the user will only be able to manage and see files in the specified root
    // directory. This makes it possible to have a dedicated home directory for each user.
    if (config.scopeUser) {
      payload['https://claims.tiny.cloud/drive/root'] = `/${user.username}`;
    }*/
    const payload = {
      sub: "123",        // Unique user id string
      name: 'Korinne',       // Full name of user
      exp: Math.floor(Date.now() / 1000) + (60 * 10)
    }

    try {
      const privateKey = fs.readFileSync(config.privateKeyFile).toString();
      console.log(privateKey);
      const token = jwt.sign(payload,privateKey, { algorithm: 'RS256'});
      console.log(token);
      res.send(JSON.stringify({token: token}))
        
    } catch (e) {
      res.status(500);
      res.send('Failed generate jwt token.');
      console.error(e.message);
    }
  /*} else {
    res.status(401);
    res.send('Could not produce a jwt token since the user is not logged in.');
  }*/
});

app.listen(8010)