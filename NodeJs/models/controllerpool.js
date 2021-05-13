const conn = require('./mysqlconfig.js');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

exports.inscription = function (table, user, callback) {
    const hash = bcrypt.hashSync(user.mdp, salt);
    var sql = "INSERT INTO " + table + " (id, `prenom`, `nom`, `telephone`, `email`, `mdp`) VALUES (NULL, '"+user.prenom+"','"+user.nom+"','"+user.telephone+"','"+user.email+"','"+hash+"');";
    //console.log(sql);
    conn.query(sql, function(error) {
        if (error) {
            console.log(error)
            
        }   
        callback();
    
})};

exports.connexion = function(table, user, callback) {
    //console.log(user);
    var sql = "SELECT * FROM " + table + " WHERE email = " + "'" +user.mail +"'";
    //console.log(sql);
    conn.query(sql, function(error, rows) {
        console.log(error);
        if (error){
            console.log(error);
        }
        callback(rows);
    })
}

exports.getAllArticles = function (table, callback){
    var sql = "SELECT * FROM " + table;
        conn.query(sql, function(error, rows) {
            if (error) {
                console.log(error);
            }
            callback(rows);
})}

exports.createArticle = function (table, article, callback){
    var sql = "INSERT INTO " + table + "(id, banniere, titre, chapeau, contenu) VALUE (NULL, '"+article.unArticle.banniere+"','"+article.unArticle.titre+"','"+article.unArticle.chapeau+"','"+article.unArticle.contenu+"');";
    conn.query(sql, function(error) {
        if (error) {
            console.log(error)
            
        }   
        callback();
})}


exports.updateArticles = function (table, article, callback){
    //console.log(article);
    var sql = "UPDATE " + table + " SET `banniere` = " + "'" + article.unArticle.banniere +"'" + "," + `titre = ` + "'" + article.unArticle.titre + "'" + "," + `chapeau = ` + "'" + article.unArticle.chapeau + "'" + "," + `contenu = ` + "'" + article.unArticle.contenu + "'"  + " WHERE id = " + article.unArticle.id ;
    conn.query(sql, function(error) {
        if (error) {
            console.log(error)
            
        }   
        callback();
})}
