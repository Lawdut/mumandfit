//const conn = require('./mysqlconfig.js');
var mysql  = require('mysql');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const conn = mysql.createConnection({
    host     : 'localhost',
    port     :  3306,
    user     : 'root',
    password : '',
    database : 'mumandfit'
});
conn.connect(function(error){
    if(!!error){
      console.log(error);
    }else{
      console.log('Connected!:)');
    }
  });


exports.inscription =  function (table, user, callback) {
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
exports.getPresentation = function (table, callback){
    var sql = "SELECT `textPres` FROM " + table + " WHERE id = " + 1;
    conn.query(sql, function(error, rows){
        if(error){
            console.log(error)
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

exports.getResultsOfSearch = function(table, requestCleaned, callback){
    var sql = "SELECT * FROM "+table+" WHERE titre LIKE '" + "%" + requestCleaned.search + "%" +"' OR chapeau LIKE '" + "%" + requestCleaned.search + "%" +"' OR contenu LIKE '" + "%" + requestCleaned.search + "%" +"' ORDER BY id;";
    conn.query(sql, function(error, rows){
        if(error) {
            console.log(error)
        }
        callback(rows);
    })
}

exports.getNumberOfArticles = function (table, callback){
    var sql = "SELECT count(*) as number FROM "+ table;
    conn.query(sql, function(error, rows) {
        if (error) {
            console.log(error);
        }
        callback(rows);
    })
}


exports.createArticle = function (table, table2, article, images, callback){

    var idArticle = "SELECT MAX(`id`) as id FROM " + table;
    var sql = "INSERT INTO " + table + "(id, banniere, titre, chapeau, contenu) VALUE (NULL, '"+article.unArticle.banniere+"','"+article.unArticle.titre+"','"+article.unArticle.chapeau+"','"+article.unArticle.contenu+"');";
    

    conn.beginTransaction(function(error){
        if(error){
            return conn.rollback(function() {
                throw error;
            })
        }
        conn.query(sql, function(error){
            if(error){
                return conn.rollback(function(){
                    throw error;
                })
            }
            conn.query(idArticle, function(error, results){
                if(error){
                    return conn.rollback(function(){
                        throw error;
                    })
                }
            let id = results[0].id;
            //console.log('controller :'+images);

            if(typeof images !== 'undefined' /*images.length > 0*/){
                for (let i = 0 ; i < images.length ; i++){
                    conn.query("INSERT INTO "+ table2 + "(id, nom_image, id_article) VALUE (NULL, '" + images[i] + "','" + id +"');", function(error){
                        if(error){
                            return conn.rollback(function() {
                                throw error;
                            })
                        }
                        conn.commit(function(err) {
                            if (err) {
                                console.log('commit')
                              return connection.rollback(function() {
                                throw err;
                              })
                            } 
                            console.log('success!');
                            callback();
                        })
                    })
                }
            }else{
                conn.commit(function(err) {
                    if (err) {
                        console.log('commit')
                      return connection.rollback(function() {
                        throw err;
                      })
                    } 
                    console.log('success!');
                    callback();
                })
            }
            
            })
        })
    })
}


exports.updateArticles = async function (table1, table2, article, images, callback){
    //console.log(article);
    var sql = "UPDATE " + table1 + " SET `banniere` = " + "'" + article.unArticle.banniere +"'" + "," + `titre = ` + "'" + article.unArticle.titre + "'" + "," + `chapeau = ` + "'" + article.unArticle.chapeau + "'" + "," + `contenu = ` + "'" + article.unArticle.contenu + "'"  + " WHERE id = " + article.unArticle.id ;
    //var imageBdd = [];
    conn.query(sql, function(error) {
        if (error) {
            console.log(error)
            
        }else{
            var imageDelBdd = "DELETE FROM " + table2 + " WHERE id_article = "+ article.unArticle.id;
            
            conn.query(imageDelBdd, function(error){
                console.log('hello from delete contoller pool')
                if(error){
                    return conn.rollback(function(){
                        throw error;
                    })
                }
                //console.log(imageBdd.nom_image);*/
                console.log('controller2 :' +images);
                for(let i = 0; i < images.length; i++) {
                    console.log('hello from insert contoller pool')
                    console.log(images[i])
                    var image = "INSERT INTO "+ table2 + "(id, nom_image, id_article) VALUE (NULL, '" + images[i] + "','" + article.unArticle.id+"');" ;
                    conn.query(image, function(error){
                        if(error){
                            return conn.rollback(function(){
                                throw error;
                            })
                        }
                    })
                }
            })
            console.log('modifié')
            callback();
        }
    })
}

exports.getAllImage = function(table, article, callback){
    var sql = "SELECT * FROM "+ table + " WHERE id_article = " + article.unArticle.id;
    //console.log(sql);
    conn.query(sql, function(error, rows) {
            if(error){
                console.log(error)
            }
            //console.log(rows);
            callback(rows);
        })
     
}



exports.deleteAllInDBB = async function(table1, table2, article, callback){
    var image = "DELETE FROM " + table2 + " WHERE id_article = "+ article.unArticle.id;
    var articles = "DELETE FROM " + table1 + " WHERE id = " + article.unArticle.id;
    

    conn.beginTransaction(function(err) {
        if(err) {
            throw err;
        }
        conn.query(image, function(error) {
            if(error) {
                return conn.rollback(function() {
                    throw error;
                })
            }
            conn.query(articles, function(error){
                if(error){
                    return conn.rollback(function(){
                        throw error;
                    })
                }conn.commit(function(error){
                    if(error){
                        return conn.rollback(function(){
                            throw error;
                        })
                    }
                    console.log('Succès !!')
                    callback();
                })
            })
        })

    })
  
}
