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
const nodemailer = require('nodemailer');
dotenv.config();
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const salt = bcrypt.genSaltSync(10);
const path = require("path");
const config = require("./models/config.js");
const helmet = require('helmet');
const axios = require("axios");



const { format } = require("mysql");
const { Console } = require("console");
const { ppid } = require("process");
const { type } = require("os");
/*const ash = require('express-async-handler')*/

          /* ----- VARIABLE GLOBALE ----- */
const dirPath = path.join(__dirname, '..\\VueJs\\mumandfit\\public\\images\\')
var imageTab = [];

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

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
                                                                        // ----- NETTOYAGE DES DONNEES ----- //
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
                    // ----- NETTOYAGE DES DONNEES ----- //
  function cleanArticle(unArticle){
    let unArticleToClean = unArticle; 
    
    for(let i in unArticleToClean['unArticle']){
      if (typeof unArticleToClean['unArticle'][i] === 'string'){
      unArticleToClean['unArticle'][i] = unArticleToClean['unArticle'][i].replace(/'/g,"&apos;").replace(/#/g,"&num;").replace(/♯/g,"&sharp;");
      console.log(unArticleToClean['unArticle'][i]);
      } 
    }
    return unArticleToClean;
  }
function cleanSearch(request){
  let requestToClean = request;
 
  requestToClean['search'] = requestToClean['search'].replace(/'/g,"&apos;").replace(/#/g,"&num;").replace(/♯/g,"&sharp;").replace(/ /g, "% %");
  
  return requestToClean;
}

function clean(request){
  let requestToClean = request;

  requestToClean = requestToClean.replace(/'/g,"&apos;").replace(/#/g,"&num;").replace(/♯/g,"&sharp;");

  return requestToClean;
}
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
                                                                        // ----- CONNEXION - INSCRIPTION ----- //
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
app.post('/inscription', function (req, res) {
    
    bdd.verifCustomerExist('user', req.body, function(userExist){
      console.log()
      if (userExist) {
        res.send({ res: false });
      }else{
        bdd.inscription('user', req.body, function(err) {
          if (err) {
              res.status(500).send({ message: err });
            }
          res.send({res : true})
        })
      }
    })
});

app.post('/connexion', function (req, res) {

  axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=6LeJiycbAAAAAC2O9CmLGEV96ZYSMJcOdyDKtoYL&response=${req.body.token}`)
  .then((resp)=>{
    console.log(resp.data)
    if(resp.data.success === true){
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
    }else{
      res.send("Erreur Recaptcha")
    }
  })
})

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
                                                                        // ----- PAGE ACCUEIL ----- //
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
          
        /* ----- GESTION DE LA PAGE HOME ----- */
app.post('/getPres', function(req, res){
  bdd.getPresentation('textPresentation', function(pres){
    res.send(pres[0]);
  })
})
app.post('/modifPres',authenticateToken, function (req, res){
  let modifPres = clean(req.body.pres);
  
  bdd.modifPresentation('textPresentation', modifPres, function(err){
    if(err){
      res.json({response : 'modification annulée'})
    }
  })
  res.json({response : 'modification validée'})
})

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
                                                                        // ----- MOTEUR DE RECHERCHE ----- //
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

          /* ----- MOTEUR DE RECHERCHE ----- */
app.post('/searchArticle', function(req, res){
  //console.log(req.body);
  let requestCleaned = cleanSearch(req.body);

  bdd.getResultsOfSearchArticles('articles', requestCleaned, function(filterArticles){
    console.log(filterArticles);
    res.send({filterArticles})
  })
})

app.post('/searchEbook', function(req, res){
  let requestCleaned = cleanSearch(req.body);

  bdd.getResultsOfSearchEbooks('ebook', requestCleaned, function(filterEbooks){
    console.log(filterEbooks);
    res.send({filterEbooks})
  })
})

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
                                                                        // ----- ARTICLE ----- //
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

        /* ----- CREATION ARTICLE ----- */

app.post('/createArticle',authenticateToken, function(req, res) {
    
  let unArticleCreateClean = cleanArticle(req.body);
  let imageTabToBDDcreate = cleanFolderImagesCreate(unArticleCreateClean);

  try{
    
    imageTab = [];
    bdd.createArticle('articles', 'image', unArticleCreateClean, imageTabToBDDcreate, function(err){
      if (err) {
        res.status(500).send({ message: err });
      }
      
    })
    res.send('Créé');
  }catch(err){
    res.status(500);
    res.send('Erreur de création de l\'article');
    console.error(err.message);
  }
});
          /* ----- AFFICHAGE ARTICLES -----*/
app.post('/getAllArticles', function (req, res) {
  bdd.getAllArticles('articles', function (articles) {
    res.send({articles});
  })
})


          /* ----- MODIFICATION ARTICLES -----*/
app.post('/modifArticle',authenticateToken, function(req, res){
  let unArticleCleaned = cleanArticle(req.body);
  console.log (req.body)
  const imageFromBDD = []
  //let imageFromBDD = bdd.getAllImages('image', unArticleCleaned);
  try {
    bdd.getAllImage('image', unArticleCleaned, function(images){
      for (let i = 0 ; i < images.length; i++){
        imageFromBDD.push(images[i].nom_image)
      }
      cleanFolderImagesUpdate(unArticleCleaned, imageFromBDD, function() {

        bdd.updateArticles('articles', 'image', unArticleCleaned, imageTab, function(err){
          if (err) {
            res.status(500).send({ message: err });
          }imageTab = [];
        })
      })
    })
    res.json({res : "Modifié"})
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

    await bdd.getAllImage('image', unArticle , function(images){
      
        for(let i = 0 ; i < images.length; i++){
          fs.unlinkSync(dirPath+images[i].nom_image);
          
        }
    })

    await bdd.deleteAllInDBB('articles', 'image', unArticle, function(){})
    res.json({res : "Supprimé"})

  }catch(error){
    console.log(error)
  }    
    
})

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
                                                                        // ----- EBOOK ----- //
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

          /* ----- REFERENCEMENT D UN NOUVEL EBOOK ----- */

app.post('/createEbook', authenticateToken, function (req, res){
//console.log(req.body)

req.body.ebook.titre = clean(req.body.ebook.titre)
req.body.ebook.description = clean(req.body.ebook.description)
req.body.ebook.corps = clean(req.body.ebook.corps)

//console.log(req.body)

  try {
    bdd.createEbook('ebook', req.body, function(err){
      if(err){
        res.status(500).send({ message: err });
      }
      res.send({res : 'Ebook créé'});
    })

  }catch(err){
    res.status(500);
    res.send('Erreur de création de l\'ebook');
    console.error(err.message);
  }
})

          /* AFFICHAGE DES EBOOKS ----- */
app.post('/getAllEbooks', function(req, res){
  bdd.getAllEbooks('ebook', function(ebooks){
    res.send({ebooks})
  })
})

app.post('/getOneEbook', function(req, res){
  console.log(req.body)
  bdd.getOneEbook('ebook', req.body.id, function(ebook){
    res.send({ebook})
  })
})

app.post('/modifEbook',authenticateToken, function(req, res){

  req.body.ebook.titre = clean(req.body.ebook.titre)
  req.body.ebook.description = clean(req.body.ebook.description)
  req.body.ebook.corps = clean(req.body.ebook.corps)

  bdd.saveModifEbook('ebook', req.body.ebook, function(){
    res.json({res : 'Ebook modifié'})
  })
})

app.post('/deleteEbook', authenticateToken, function(req, res){
  bdd.deleteEbookInBDD('ebook', req.body.ebook, function(){
    res.json({res : 'Ebook supprimé'})
  })
})
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
                                                                        // ----- IMAGE ----- //
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

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
    const fileName = 'kkfmaf_'+Date.now() +'.'+ typeFile[1];

    imageTab.push(fileName);

    sampleFile.mv(path.join(__dirname, '../', 'VueJs/mumandfit/public/images/', fileName), function (err) {
      const temp = path.join(__dirname, '../', 'VueJs/mumandfit/public/images/', fileName);
      mime.getType(path.join(__dirname, '../', 'VueJs/mumandfit/public/images/', fileName));
      if (err) {
        res.status(500).send(err);
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

function cleanFolderImagesCreate(article) {
console.log(article.unArticle.id);
art = article.unArticle.banniere.concat(' ', article.unArticle.contenu)
let img = 'kkfmaf_';

//console.log(article);
let imageInArticle = [];
let imageTab2= [];

let index = art.indexOf(img)


  while (index != -1){

    if(art.substring(index+24, index+25) != '"'){
      imageInArticle.push(art.substring(index, index+25));
    }else{
      imageInArticle.push(art.substring(index, index+24))
    }
    index = art.indexOf(img, index+1)
  }

  //Dans le cas de la création d'un article
  if(imageTab.length > 0 && article.unArticle.id === ''){
    console.log('hello hi ouille')
    for(let h = 0 ; h < imageTab.length; h++){
      imageTab2[h]= imageTab[h];
    }
    imageTab.length = 0 ;
    

    for(let i = 0 ; i < imageTab2.length; i++){
      
      let count = 0;

      for(let j = 0 ; j < imageInArticle.length ; j++){
     
        console.log(imageTab2[i] == imageInArticle[j])
        if(imageTab2[i] == imageInArticle[j]){
          imageTab.push(imageTab2[i]);
          console.log(imageTab);
          count = 1;  
      }
    }if (count == 0){
      fs.unlinkSync(dirPath+imageTab2[i])
    }
  }
  return imageTab;
  }
}
function cleanFolderImagesUpdate(article, images, callback){
console.log(images)
console.log(article.unArticle.id);
art = article.unArticle.banniere.concat(' ', article.unArticle.contenu)
let img = 'kkfmaf_';

//console.log(article);
let imageInArticle = [];
let imageFromBDD = [];
let imageTab2= [];

let index = art.indexOf(img)


  for(let i = 0 ; i < images.length; i++){
    imageFromBDD.push(images[i])
    console.log('remplissage de imagefromBDD via imageTab :' + i)
    console.log(imageFromBDD)
  }

  while (index != -1){

    if(art.substring(index+24, index+25) != '"'){
      imageInArticle.push(art.substring(index, index+25));
      console.log('remplissage de imageinArticle')
      console.log(imageInArticle)
    }else{
      imageInArticle.push(art.substring(index, index+24))
      console.log('remplissage de imageinArticle')
      console.log(imageInArticle)
    }
    index = art.indexOf(img, index+1)
  }


//Dans le cas de la modification d'un article ET/OU de la suppression d'images déjà existantes antérieurement ET avec ajout de nouvelles images.
  // Il faudra nettoyer le dossier images ET la BDD.
  if (imageTab.length > 0 ){
    console.log('hello ouailllllle');
    
      for(let j = 0 ; j < imageTab.length; j++){
        imageTab2.push(imageTab[j]);
        console.log('remplissage de imageTab2 via imageTab :' + j)
        console.log(imageTab2);
      }
      imageTab = [];

      //Nettoyage des images contenues dans la base de données MAIS plus présentes dans l'article
      for(let k = 0 ; k < imageFromBDD.length; k++){
        console.log('premier for')
          let count = 0;
    
          for(let m = 0 ; m < imageInArticle.length ; m++){
            console.log('deuxième for')
            console.log(typeof imageFromBDD)
            console.log(typeof imageInArticle)
            console.log('nettoyage bdd')
            console.log(imageFromBDD[k] == imageInArticle[m])
            if(imageFromBDD[k] == imageInArticle[m]){
              console.log(imageInArticle[m]);
              console.log('imageTab rempli dans if 1 : ' +imageTab);
              count = 1;  
              console.log('premier if')
          }
        }if (count == 0){
          //console.log('deuxième if' + imageFromBDD[k])
          fs.unlinkSync(dirPath+imageFromBDD[k])
        }
      }
      for(let n = 0 ; n < imageTab2.length; n++){
          
        let count2 = 0;
  
        for(let p = 0 ; p < imageInArticle.length ; p++){
          console.log('nettoyage folder')
          console.log(imageTab2)
          console.log(imageInArticle)
          console.log(imageTab2[n] == imageInArticle[p])
          if(imageTab2[n] == imageInArticle[p]){
            console.log('imagTab version finale : ' +imageTab)
            count2 = 1;  
        }
      }if (count2 == 0){
        console.log(n)
        console.log('suppression de : '+ imageTab.splice(n,1))
        console.log('hello')
        fs.unlinkSync(dirPath+imageTab2[n])
      }        
      }

      for(let q = 0 ; q < imageInArticle.length; q++){
        imageTab.push(imageInArticle[q])
      }
      callback();
          
          
        
      
      
    


  //Dans le cas de la modification d'un article ET de la suppression d'images déjà existante antérieurement sans ajout de nouvelles images.
  }else if (imageTab.length == 0){
    console.log('hello ouille')

      for(let k = 0 ; k < imageFromBDD.length; k++){
        console.log(imageFromBDD)
        console.log('premier for')
        let count = 0;
  
        for(let j = 0 ; j < imageInArticle.length ; j++){
          console.log('deuxième for')
          console.log(typeof imageFromBDD)
          console.log(typeof imageInArticle)
          console.log(imageFromBDD[k] == imageInArticle[j])
          if(imageFromBDD[k] == imageInArticle[j]){
            console.log(imageInArticle[j]);
            imageTab.push(imageInArticle[j]);
            console.log(imageTab)
            console.log('imageTab rempli dans if 2 : ' +imageTab);
            count = 1;  
            console.log('premier if')
        }
      }if (count == 0){
        console.log('deuxième for')
        fs.unlinkSync(dirPath+imageFromBDD[k])
      }
    }
    callback();
  }
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
                                                                        // ----- SLIDER ----- //
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/* ----- UPLOAD IMAGE SLIDER ----- */
app.post('/uploadSlider', async function(req, res){
  
  const sampleFile = req.files.image;
  const fileName = 'image'+req.body.id +"."+ "jpg";
  const folderPath = path.join(__dirname, '..\\VueJs\\mumandfit\\public\\imagesSlider\\')

  
  fs.unlinkSync(folderPath+fileName)
      
  moveImage(sampleFile, fileName, function(mess){
    res.send(mess)
  })
});


function moveImage(image, fileName, callback){
  console.log(image)
  image.mv(path.join(__dirname, '../', 'VueJs/mumandfit/public/imagesSlider/', fileName), function (err) {
    if (err) {
      callback(err);
    }
    let mess = 'image changée'
    callback(mess)
  }) 
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
                                                                        // ----- FORMULAIRE DE CONTACT ----- //
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

          /*-----FORMULAIRE DE CONTACT ET ENVOI MAIL-----*/
app.post('/formContact', (req, res)=>{
  console.log(req.body.mail);
  axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=6LeJiycbAAAAAC2O9CmLGEV96ZYSMJcOdyDKtoYL&response=${req.body.token}`)
  .then((resp)=>{
    console.log(resp.data)
    
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth:{
        user : process.env.EMAIL,
        pass: process.env.PASSWORD,
      }
    });
  
    let mailOption = {
      from: '"MumAndFit Contact" <mumandfit@gmail.com>',
      to:'mumandfit@gmail.com',
      subject:'Demande de prise de contact',
      html: 
      '<h1>Demande de contact de :</h1> <br> <strong>Prénom :</strong> ' + req.body.firstName + '<br> <strong>Nom :</strong> ' +req.body.lastName + '<br> <strong>Email :</strong> ' + req.body.mail + '<br> <strong>Numéro de téléphone :</strong> '+req.body.phone+ '<br> <strong>Message :</strong> <br>'+ req.body.message
      
      
    };
    if(resp.data.success === true){
      transporter.sendMail(mailOption, function(err, data){
        if(err){
          console.log('email non envoyé', err);
        }else{
          res.send('email envoyé')
        }
      })
      res.send('message envoyé !')
    }else{
      res.send('Erreur recaptcha')
    }
  })
})

    
  


app.listen(8010)