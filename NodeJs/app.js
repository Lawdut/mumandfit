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

app.listen(8010)