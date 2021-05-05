const conn = require('./mysqlconfig.js');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

exports.inscription = function (table, user, callback) {
    const hash = bcrypt.hashSync(user.mdp, salt);
    var sql = "INSERT INTO " + table + " (id, `prenom`, `nom`, `telephone`, `email`, `mdp`) VALUES (NULL, '"+user.prenom+"','"+user.nom+"','"+user.telephone+"','"+user.email+"','"+hash+"');";
    console.log(sql);
    conn.query(sql, function(error) {
        if (error) {
            console.log(error)
            
        }   
        callback();
    
})};

exports.getAllArticles = function (table, callback){
    var sql = "SELECT * FROM " + table;
        conn.query(sql, function(error, rows) {
            if (error) {
                console.log(error);
            }
            callback(rows);
})}

exports.updateArticle = function (table, article, callback){
    console.log(article);
    var sql = "UPDATE " + table + " SET `contenu` = " + "'" +article.articleModif.contenu +"'" + " WHERE id = " + article.articleModif.id;
    conn.query(sql, function(error) {
        if (error) {
            console.log(error)
            
        }   
        callback();
})}
