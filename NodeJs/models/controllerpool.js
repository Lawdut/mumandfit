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

/*exports.createArticle = async function(table, table2, article, images, callback){
    try{
        await conn.query('START TRANSACTION');
        await conn.query("INSERT INTO " + table + "(id, banniere, titre, chapeau, contenu) VALUE (NULL, '"+article.unArticle.banniere+"','"+article.unArticle.titre+"','"+article.unArticle.chapeau+"','"+article.unArticle.contenu+"');");
        for (let i = 0 ; i < images.length; i++){
            await conn.query("INSERT INTO "+ table2 + "(id, nom_image, id_article) VALUE (NULL, '" + "../images/"+ images[i] + "','" + article.unArticle.idArticle+"');");
        }
        await conn.query('COMMIT');
    }catch(err){
        await conn.query('ROLLBACK');
}
    callback();
}*/



exports.createArticle = function (table, table2, article, images, callback){
    var sql = "INSERT INTO " + table + "(id, banniere, titre, chapeau, contenu) VALUE (NULL, '"+article.unArticle.banniere+"','"+article.unArticle.titre+"','"+article.unArticle.chapeau+"','"+article.unArticle.contenu+"');";
   console.log(article)
    conn.query(sql, function(error) {
        if (error) {
            console.log(error)      
        }else{
            for(let i = 0; i < images.length; i++) {
                var image = "INSERT INTO "+ table2 + "(id, nom_image, id_article) VALUE (NULL, '" + "/images/"+ images[i] + "','" + article.unArticle.idArticle +"');" ;
                conn.query(image, function(error){
                    if(error){
                        console.log(error)
                    }
                })
            }
            callback();
        }        
    })
}
exports.selectArticle = function(table, callback){
    var idArticle = "SELECT MAX(`id`) as id FROM " + table;
    conn.query(idArticle, function(error, rows){
        if(error){
            console.log(error)
        }
        callback(rows);
    })
    
}

/*exports.insertImage = function(table , images, idArticle, callback){
    console.log(idArticle);
    for(let i = 0; i < images.length; i++) {
        var image = "INSERT INTO "+ table + "(id, nom_image, id_article) VALUE (NULL, '" + "../images/"+ images[i] + "','" + idArticle +"');" ;
        conn.query(image, function(error){
            if(error){
                console.log(error)
            }
            callback();
        })
    }
   
}*/

exports.updateArticles = function (table1, table2, article, images, callback){
    //console.log(article);
    var sql = "UPDATE " + table1 + " SET `banniere` = " + "'" + article.unArticle.banniere +"'" + "," + `titre = ` + "'" + article.unArticle.titre + "'" + "," + `chapeau = ` + "'" + article.unArticle.chapeau + "'" + "," + `contenu = ` + "'" + article.unArticle.contenu + "'"  + " WHERE id = " + article.unArticle.id ;
    conn.query(sql, function(error) {
        if (error) {
            console.log(error)
            
        }else{
            for(let i = 0; i < images.length; i++) {
                var image = "INSERT INTO "+ table2 + "(id, nom_image, id_article) VALUE (NULL, '" + "..\\images\\"+ images[i] + "','" + article.unArticle.id+"');" ;
                conn.query(image, function(error){
                    if(error){
                        console.log(error)
                    }
                })
            }
            callback();
        }
        
})}

exports.getAllImage = function(table, article, callback){
    var sql = "SELECT * FROM "+ table + " WHERE id_article = " + article.unArticle.id;
    //console.log(sql);
    conn.query(sql, function(error, rows) {
            if(error){
                console.log(error)
            }
            //console.log(rows);
            callback (rows);  
        })
     
}
