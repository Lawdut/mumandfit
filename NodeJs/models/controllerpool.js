const conn = require('./mysqlconfig.js');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

exports.inscription = function (table, user, callback) {
    const hash = bcrypt.hashSync(user.mdp, salt);
    var sql = "INSERT INTO " + table + " (`prenom`, `nom`, `telephone`, `email`, `mdp`) VALUES (NULL, '"+user.prenom+"','"+user.nom+"','"+user.telephone+"','"+user.email+"','"+hash+"', client, user);";
    console.log(sql);
    conn.query(sql, function(error) {
        if (error) {
            console.log(error)
            
        }   
        callback();
    
})
}