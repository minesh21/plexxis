const mariadb = require('mariadb/callback');

const conn = mariadb.createConnection({host: '127.0.0.1', user:'root', password: ''});

// Create database if none exists
conn.query('CREATE DATABASE plexxis', err => {
  if (err) {
    console.log('Database already exists');
  } else {
    console.log('Created Database plexxis');
  }
  // Create User table
  conn.query(`CREATE TABLE IF NOT EXISTS plexxis.users(
    id int(11) NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    code varchar(255) NULL,
    profession varchar(255) NOT NULL,
    color varchar(255) NOT NULL,
    city varchar(255) NOT NULL,
    branch varchar(255) NOT NULL,
    assigned BOOLEAN DEFAULT NULL,
    PRIMARY KEY(id));`, err => {
    if (err) {
      console.log(err);
      console.log('Table already exists');
    }
  });

  // conn.query(`ALTER TABLE plexxis.users
  // MODIFY code varchar(255) NULL
  // `, err => {
  //   if (err) {
  //     //console.log(err);
  //     //console.log(err);
  //   }
  //   console.log('Modified column in users');
  // })
});


module.exports = conn;