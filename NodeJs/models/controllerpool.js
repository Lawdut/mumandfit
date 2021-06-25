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

/*const conn = mysql.createConnection({
    host     : 'mysql-mumandfit.alwaysdata.net',
    user     : 'mumandfit',
    password : 'KokoFit',
    database : 'mumandfit_mumandfit'
})*/

conn.connect(function(error){
    if(!!error){
      console.log(error);
    }else{
      console.log('Connected!:)');
    }
  });


exports.inscription =  function (table, user, callback) {
    const hash = bcrypt.hashSync(user.mdp, salt);
    
    var sql = "INSERT INTO " + table + " (id, `prenom`, `nom`, `email`, `mdp`) VALUES (NULL, '"+user.prenom+"','"+user.nom+"','"+user.email+"','"+hash+"');";
    
    conn.query(sql, function(error) {
        if (error) {
            console.log(error)
            
        }   
        callback();
    })
};

exports.verifCustomerExist = function(table, user, callback){
    var sql = "SELECT * FROM "+table+ " WHERE email = " + "'" + user.email +"'";
    conn.query(sql, function(error, rows){
        if (error){
            console.log(error)
        }else{
            callback(rows[0]); 
        }
    })
}

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

exports.modifPresentation = function(table, modifPres, callback){
    var sql = "UPDATE " + table + " SET `textPres` = " + "'" + modifPres  + "'" + " WHERE id = " + 1;
    conn.query(sql, function(err) {
        if(err){
            console.log(err)
        }
        callback();
    })
}
exports.getAllArticles = function (table, callback){
    var sql = "SELECT *, DATE_FORMAT(date_creation, '%d/%m/%Y à %H:%i:%s') as date_creat, DATE_FORMAT(date_maj, '%d/%m/%Y à %H:%i:%s') as date_modif  FROM " + table;
        conn.query(sql, function(error, rows) {
            if (error) {
                console.log(error);
            }
            callback(rows);
})}

exports.getResultsOfSearchArticles = function(table, requestCleaned, callback){
    var sql = "SELECT *, DATE_FORMAT(date_creation, '%d/%m/%Y à %H:%i:%s') as date_creat, DATE_FORMAT(date_maj, '%d/%m/%Y à %H:%i:%s') as date_modif FROM "+table+" WHERE titre LIKE '" + "%" + requestCleaned.search + "%" +"' OR genre LIKE '" + "%" + requestCleaned.search + "%" +"' OR chapeau LIKE '" + "%" + requestCleaned.search + "%" +"' OR contenu LIKE '" + "%" + requestCleaned.search + "%"+"';";
    conn.query(sql, function(error, rows){
        if(error) {
            console.log(error)
        }
        callback(rows);
    })
}
exports.getResultsOfSearchEbooks = function(table, requestCleaned, callback){
    var sql = "SELECT * FROM "+table+" WHERE titre LIKE '" + "%" + requestCleaned.search + "%" +"' OR description LIKE '" + "%" + requestCleaned.search + "%" +"' OR corps LIKE '" + "%" + requestCleaned.search + "%" +"'ORDER BY id;";
        conn.query(sql, function(error, rows){
            if (error){
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
    var sql = "INSERT INTO " + table + "(id, genre, banniere, titre, chapeau, contenu, date_creation) VALUE (NULL, '"+article.unArticle.genre+"','"+article.unArticle.banniere+"','"+article.unArticle.titre+"','"+article.unArticle.chapeau+"','"+article.unArticle.contenu+"', NOW() );";
    

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
    var sql = "UPDATE " + table1 + " SET `genre` = " + "'" + article.unArticle.genre +"'" + "," + "`banniere` = " + "'" + article.unArticle.banniere +"'" + "," + `titre = ` + "'" + article.unArticle.titre + "'" + "," + `chapeau = ` + "'" + article.unArticle.chapeau + "'" + "," + `contenu = ` + "'" + article.unArticle.contenu + "'" + "," + `statusMaj = ` + "'" + article.unArticle.statusMaj + "'"+ "," + " `date_maj` = NOW() WHERE id = " + article.unArticle.id ;
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
exports.createEbook = function (table, ebook, callback){
    console.log(ebook.ebook.guid)
    var sql = "INSERT INTO " + table + "(id, guid, titre, prix, description, corps) VALUE (NULL, '"+ebook.ebook.guid+"','"+ebook.ebook.titre+"','"+ebook.ebook.prix+"','"+ebook.ebook.description+"','"+ebook.ebook.corps+"');";
    conn.query(sql, function(err){
        if(err){
            console.log(err)
        }
        callback();
    })
}
exports.getAllEbooks = function (table, callback){
    var sql = "SELECT * FROM " + table;
    conn.query(sql, function(err, rows){
        if(err){
            console.log(err)
        }
        callback(rows);
    })
}
exports.getOneEbook = function (table, id, callback){
    var sql = "SELECT * FROM " +table +" WHERE id = "+id
    conn.query(sql, function(err, rows){
        if(err){
            console.log(err)
        }
        callback(rows);
    })
}
exports.saveModifEbook = function (table, ebook, callback){
    var sql = "UPDATE "+table+" SET `prix` = "+ "'" + ebook.prix + "'" + "," + "`titre` = "+ "'" + ebook.titre + "'" + "," + "`description` = "+ "'" + ebook.description + "'" + "," + "`corps` = "+ "'" + ebook.corps+ "'" + " WHERE id = " + ebook.id;
    conn.query(sql, function(err){
        if(err){
            console.log(err)
        }
        callback();
    })
}
exports.deleteEbookInBDD = function (table, ebook, callback){
    var sql = "DELETE FROM "+table+" WHERE id = "+ebook.id
    conn.query(sql, function(err){
        if(err){
            console.log(err)
        }
        callback();
    })
}
