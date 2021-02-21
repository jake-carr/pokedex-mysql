const db = require('./index.js');
// TABLE types (
//   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
//   type VARCHAR(25)
// );

// TABLE images (
//   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
//   img VARCHAR(255)
// );

// TABLE pokemon (
//   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
//   name VARCHAR(255) NOT NULL,
//   typeNum INT,
//   imageNum INT
// );
const helpers = {
  get: (callback) => {
    let queryStr = `SELECT pokemon.id, pokemon.name, types.type, images.img FROM ((pokemon INNER JOIN types ON pokemon.id = types.id) INNER JOIN images ON pokemon.id = images.id)`;
    db.query(queryStr, (err, result) => {
      callback(err, result)
    })
  },
  getTypes: (callback) => {
    let queryStr = `SELECT type FROM types`;
    db.query(queryStr, (err, result) => {
      callback(err, result)
    })
  },
  rename: (id, name, callback) => {
    let queryStr = `UPDATE pokemon SET name = '${name}' WHERE id = ${id}`;
    db.query(queryStr, (err) => {
      callback(err)
    })
  },
  delete: (id, callback) => {
    let queryStr = `DELETE FROM pokemon WHERE id = ${id}`;
    db.query(queryStr, (err) => {
      callback(err)
    })
  },
  post: (body, callback) => {
    let query1 = `INSERT INTO pokemon (name) VALUES ('${body.name}')`;
    let query2 = `INSERT INTO types (type) VALUES ('${body.type}')`;
    let query3 = `INSERT INTO images (img) VALUES ('${body.img}')`

    db.query(query1, (err) => {
      db.query(query2, (err) => {
        db.query(query3, (err) => {
          callback(err)
        })
      })
    })


  }
}

module.exports = helpers