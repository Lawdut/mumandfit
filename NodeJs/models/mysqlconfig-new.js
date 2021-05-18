var mysql = require('mysql2/promise');
/*module.exports = {
    "pool": pool,
  };*/

const pool = mysql.createPool({ 

    host : 'localhost',
    port : 3306,
    user : 'root',
    password : '',
    database : 'mumandfit',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

/*async function transaction(queries, queryValues) {
    if (queries.length !== queryValues.length) {
        return Promise.reject(
            'Number of provided queries did not match the number of provided query values arrays'
        )
    }
    const connection = await pool.getConnection(databaseConfigs)
    try {
        await connection.beginTransaction()
        const queryPromises = []

        queries.forEach((query, index) => {
            queryPromises.push(connection.query(query, queryValues[index]))
        })
        const results = await Promise.all(queryPromises)
        await connection.commit()
        await connection.release()
        return results
    } catch (err) {
        await connection.rollback()
        await connection.release()
        return Promise.reject(err)
    }
}*/
/*function query (sql, params, cb) {
    if (typeof params === 'function') {
      cb = params;
      params = [];
    }
  
    pool.getConnection(function (err, connection) {
      if (err) {
        return cb(err);
      }
  
      connection.query(sql, params, function (err, rows, fields) {
        connection.release();
        cb(err, rows, fields);
      });
    });
  }*/