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
const config = require("./models/config.js");
const helmet = require('helmet');
const rp = require('request-promise');
/*const ash = require('express-async-handler')*/

          /* ----- VARIABLE GLOBALE ----- */
const dirPath = path.join(__dirname, '..\\VueJs\\mumandfit\\public\\images\\')
const imageTab = [];

/*const mysqlStore = require('express-mysql-session')(session);
const sessionStore = new mysqlStore(options);*/
/*const multer = require("multer");
const sharp = require("sharp");
*/

app.use(cors());
app.use(express.json({}));
app.use(express.urlencoded({extended : true}));
app.use(fileUpload({}));
app.use(helmet());
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


                    // ----- NETTOYAGE DES DONNEES ----- //
  function clean(unArticle){
    const unArticleToClean = unArticle; 
    
    for(let i in unArticleToClean['unArticle']){
      if (typeof unArticleToClean['unArticle'][i] === 'string'){
      unArticleToClean['unArticle'][i] = unArticleToClean['unArticle'][i].replace(/'/g,"&apos;").replace(/#/g,"&num;").replace(/♯/g,"&sharp;");
      //console.log(unArticleToClean['unArticle'][i]);
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
         /* ----- CREATION ARTICLE ----- */

app.post('/createArticle',authenticateToken, function(req, res) {
    
  let unArticleCreateClean = clean(req.body);
  console.log(unArticleCreateClean);
  try{
    bdd.createArticle('articles', 'image', unArticleCreateClean, imageTab, function(err){
      if (err) {
        res.status(500).send({ message: err });
      }
    });
    imageTab.length=0;
    res.send('hello');
  }catch(err){
    res.status(500);
    res.send('Erreur de création de l\'article');
    console.error(err.message);
  }
  
});
          /* ----- AFFICHAGE ARTICLES -----*/
app.get('/getAllArticles', function (req, res) {
  bdd.getAllArticles('articles', function (articles) {
    res.json({articles : articles});
    //console.log(articles);
  })
})

          /* ----- MODIFICATION ARTICLES -----*/
app.post('/modifArticle/',authenticateToken, function(req, res){
  try {
    let unArticleCleaned = clean(req.body);
    bdd.updateArticles('articles', 'image', unArticleCleaned, imageTab, function(err){
      if (err) {
        res.status(500).send({ message: err });
      }
    imageTab.length = 0;
    res.json({res : "Modifié"})
    })
  }catch(err){
    res.status(500);
    res.send('Erreur de modification de l\'article');
    console.error(err.message);
  }
    
})

          /* ----- SUPPRESSION D UN ARTICLE ----- */
app.post('/deleteArticle', authenticateToken, async function(req, res){
  let unArticle = req.body;

  try{

    await(bdd.getAllImage('image', unArticle , function(images){
      
        for(let i = 0 ; i < images.length; i++){
          fs.unlinkSync(dirPath+images[i].nom_image);
          
        }
    }))

    await(bdd.deleteAllInDBB('articles', 'image', unArticle, function(){

    }))
    

  }catch(error){
    console.log(error)
  }    
    
})


          /* ----- UPLOAD IMAGE PAR TINY DRIVE ----- */
app.post('/jwt', (req, res) => {
  
    const payload = {
      sub: "123",        // Unique user id string
      name: 'Korinne',       // Full name of user
      exp: Math.floor(Date.now() / 1000) + (60 * 10)
    }

    try {
      const privateKey = fs.readFileSync(config.privateKeyFile).toString();
      //console.log(privateKey);
      const token = jwt.sign(payload,privateKey, { algorithm: 'RS256'});
      //console.log(token);
      res.send(JSON.stringify({token: token}))
        
    } catch (e) {
      res.status(500);
      res.send('Failed generate jwt token.');
      console.error(e.message);
    }
  
});
        /* ----- UPLOAD IMAGE DANS REPERTOIRE IMAGES ----- */


app.post('/upload', (req, res)=>{
  

  const folderName = path.join(__dirname, '../VueJs/mumandfit/public/images');

  if (!fs.existsSync(folderName)) {
    fs.mkdir(folderName, function (err) {
      if (err) {
        console.log(err);
      }
      else {

      }
    });
  }
  else {
    if (!req.files) {
      return res.status(400).send('No files were uploaded.');
    }
    console.log(req.files.file.mimetype);
    console.log(req.files.file.data.byteLength);
    const sampleFile = req.files.file;
    const typeFile = req.files.file.mimetype.split('/');
    const fileName = Date.now() +'.'+ typeFile[1];

    let count = imageTab.push(fileName);
    console.log(imageTab);
    console.log(count); 

    sampleFile.mv(path.join(__dirname, '../', 'VueJs/mumandfit/public/images/', fileName), function (err) {
      const temp = path.join(__dirname, '../', 'VueJs/mumandfit/public/images/', fileName);
      mime.getType(path.join(__dirname, '../', 'VueJs/mumandfit/public/images/', fileName));         // => 'text/plain'
      if (err) {
        return res.status(500).send(err);
      }
      res.send({ 'location': '../images/'+fileName });
    });
  }
});

          /* ----- ANNULATION DE L'UPLOAD PHOTO ----- */

app.post('/createCanceled', (req, res) =>{
  for(let i = 0 ; i < imageTab.length; i++){
    fs.unlinkSync(dirPath+imageTab[i]);
    console.log(imageTab[i]);
  }
  imageTab.length=0;
  res.send('Supprimé');
})

app.listen(8010)